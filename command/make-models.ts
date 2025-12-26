import knex from 'knex';
import config from '../knexfile';
import path from 'path';
import fs from 'fs';
import { exec } from 'child_process';

const db = knex(config);

export interface ColumnInfo {
  name: string;
  type: string;
  nullable: boolean;
  defaultValue: any;
}

async function makeModel() {
  const tables: string[] = [];
  const modelsDir = path.resolve('models');
  const rows = await db
    .select('table_name')
    .from('information_schema.tables')
    .where('table_schema', 'public');

  rows.forEach((r: any) => tables.push(r.table_name));
  for (const table of tables) {
    let columns: ColumnInfo[] = [];
    const excludes = ['id', 'created_at', 'updated_at'];

    const cols = await db
      .select('column_name', 'data_type', 'is_nullable', 'column_default')
      .from('information_schema.columns')
      .where('table_name', table)
      .andWhere('table_schema', 'public');

    columns = cols
      .filter((f) => !excludes.includes(f.column_name))
      .map((c) => {
        return {
          name: c.column_name,
          type: c.data_type,
          nullable: c.is_nullable === 'YES',
          defaultValue: c.column_default,
        };
      });

    const { fileName, content } = generateModel(table, columns);
    const filePath = path.join(modelsDir, fileName);
    const baseModel = path.join(modelsDir, 'base.model.ts');

    if (!fs.existsSync(modelsDir)) {
      fs.mkdirSync(modelsDir, { recursive: true });
    }

    if (!fs.existsSync(baseModel)) {
      fs.writeFileSync(baseModel, generateBaseModel(), 'utf8');
    }

    if (fs.existsSync(filePath)) {
      //   console.log(`↻ Updating fields in existing model: ${filePath}`);

      const updated = updateExistingModel(filePath, columns);
      fs.writeFileSync(filePath, updated, 'utf8');

      continue;
    }

    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`✔ Created model: ${filePath}`);
  }
  runLint();
  process.exit(0);
}

function toPascalCase(str: string) {
  return str
    .replace(/[-_]+/g, ' ')
    .replace(/\s+/g, ' ')
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join('');
}

function normalizeName(table: string) {
  // lowercase + singular
  const singular = table.replace(/^(MS_|LK_|TR_)/i, '');
  const lower = singular.toLowerCase();

  const fileName = `${lower.replaceAll('_', '-')}.model.ts`;
  const className = toPascalCase(lower) + 'Model';

  return { fileName, className };
}

function getElementType(columnDefault: string) {
  let elementType = 'any[]';

  if (columnDefault) {
    if (/character varying|varchar|text/i.test(columnDefault)) {
      elementType = 'string[]';
    } else if (
      /integer|bigint|numeric|decimal|real|double/i.test(columnDefault)
    ) {
      elementType = 'number[]';
    } else if (/boolean/i.test(columnDefault)) {
      elementType = 'boolean[]';
    }
  }
  return elementType;
}

function pgToTs(type: string, defaultValue: string) {
  switch (type) {
    case 'integer':
    case 'bigint':
    case 'decimal':
    case 'numeric':
    case 'real':
    case 'double precision':
      return 'number';

    case 'character varying':
    case 'text':
    case 'varchar':
    case 'char':
    case 'uuid':
      return 'string';

    case 'boolean':
      return 'boolean';

    case 'timestamp without time zone':
    case 'timestamp with time zone':
    case 'date':
      return 'string';
    case 'ARRAY':
      return getElementType(defaultValue);
    default:
      return 'any';
  }
}

function generateInterfaces(col: ColumnInfo) {
  const tsType = pgToTs(col.type, col.defaultValue);
  const optional = col.nullable ? '?' : '';
  const safeName = /\s/.test(col.name) ? `'${col.name}'` : col.name;
  return `  ${safeName}${optional}: ${tsType};`;
}

function generateModel(table: string, columns: ColumnInfo[]) {
  const { fileName, className } = normalizeName(table);

  const fields = columns.map((col) => generateInterfaces(col)).join('\n');

  const content =
    `import { Table } from 'utils/decorators/objections.decorator';
import { BaseModel } from './base.model';

@Table('${table}')
export class ${className} extends BaseModel {
  // === FIELD START ===
${fields}
  // === FIELD END ===
}`.trim();

  return { fileName, content };
}

function generateBaseModel() {
  return `import { Model } from 'objection';
import config from '../knexfile.ts';
import Knex from 'knex';

const knex = Knex(config);
Model.knex(knex);

export class BaseModel extends Model {
  id: number;
  createdAt: string;
  updatedAt: string;


  $beforeInsert() {
    const now = new Date().toISOString();
    this.createdAt = now;
    this.updatedAt = now;
  }

  $beforeUpdate() {
    this.updatedAt = new Date().toISOString();
  }
}`;
}

export function updateExistingModel(filePath: string, columns: ColumnInfo[]) {
  const content = fs.readFileSync(filePath, 'utf8');

  const start = '  // === FIELD START ===';
  const end = '  // === FIELD END ===';

  if (!content.includes(start) || !content.includes(end)) {
    console.log(`⚠ Tidak menemukan block field, skip update: ${filePath}`);
    return content;
  }

  const newFieldString = columns.map((c) => generateInterfaces(c)).join('\n');

  const updated = content.replace(
    new RegExp(`${start}[\\s\\S]*?${end}`, 'g'),
    `${start}\n${newFieldString}\n${end}`,
  );

  return updated;
}

function runLint() {
  console.log('Running: pnpm eslint --fix ...');

  const process = exec('pnpm eslint --fix');

  process.stdout?.on('data', (data: any) => {
    console.log(data.toString());
  });

  process.stderr?.on('data', (data: any) => {
    console.error('[ERROR]', data.toString());
  });

  process.on('close', (code: any) => {
    console.log(`Lint finished with exit code ${code}`);
  });
}

makeModel();
