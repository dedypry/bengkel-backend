import { AnyQueryBuilder, Model, ModelClass } from 'objection';
const tableMetadataKey = Symbol('tableName');
import pluralize from 'pluralize';

const relationMetadataKey = Symbol('relations');
const modifierMetadataKey = Symbol('modifiers');

export type RelationType = 'HasOne' | 'HasMany' | 'BelongsToOne' | 'ManyToMany';

interface IThrough {
  table: string;
  from: string;
  to: string;
  extra?: string[];
}
interface IJoin {
  from?: string;
  to?: string;
  filter?: (query: AnyQueryBuilder) => any;
  through?: IThrough;
}
interface RelationMeta {
  property: string;
  relatedModel: () => ModelClass<any>;
  relation: RelationType;
  join: IJoin;
}

export function Table(name?: string, options?: { hide?: string[] }) {
  return function (target: any) {
    let tableName = name
      ? name
      : target.name
          .replace(/Model$/, '')
          .replace(/[A-Z]/g, (char: any, index: number) =>
            index === 0 ? char.toLowerCase() : `_${char.toLowerCase()}`,
          );

    if (!name) {
      tableName = pluralize.isPlural(tableName)
        ? tableName
        : pluralize.plural(tableName);
    }

    Reflect.defineMetadata(tableMetadataKey, tableName, target);

    Object.defineProperty(target, 'tableName', {
      get: () => Reflect.getMetadata(tableMetadataKey, target),
    });

    target.prototype.$formatJson = function (json: any) {
      // Panggil implementasi asli dari Model (super)
      // Gunakan Object.getPrototypeOf untuk mendapatkan method dari parent (BaseModel/Model)
      json = Object.getPrototypeOf(target.prototype).$formatJson.call(
        this,
        json,
      );

      // Ambil list field yang ingin disembunyikan
      const fieldsToHide = options?.hide || ['password'];

      fieldsToHide.forEach((field) => {
        delete json[field];
      });

      return json;
    };

    Object.defineProperty(target, 'modifiers', {
      get: function () {
        return Reflect.getMetadata(modifierMetadataKey, target) || {};
      },
    });

    Object.defineProperty(target, 'relationMappings', {
      get: function () {
        const relations =
          Reflect.getMetadata(relationMetadataKey, target) || {};

        const mappings: any = {};

        for (const [key, value] of Object.entries(relations)) {
          // const relationType = (value as RelationMeta).relation;
          const modelClass = (value as any).modelClass;
          const join = (value as any).join;

          const ownerTable = Reflect.getMetadata(tableMetadataKey, target);
          const relatedTable = Reflect.getMetadata(
            tableMetadataKey,
            modelClass(),
          );

          const finalJoin = {
            from: join?.from?.includes('.')
              ? join?.from
              : `${ownerTable}.${join?.from || 'id'}`,

            to: join?.to?.includes('.')
              ? join?.to
              : `${relatedTable}.${join?.to || 'id'}`,
          };

          let relation: any = null;

          switch ((value as RelationMeta).relation as RelationType) {
            case 'BelongsToOne':
              relation = Model.BelongsToOneRelation;
              break;
            case 'HasMany':
              relation = Model.HasManyRelation;
              break;
            case 'HasOne':
              relation = Model.HasOneRelation;
              break;
            case 'ManyToMany':
              finalJoin.from = `${ownerTable}.id`;
              finalJoin.to = `${relatedTable}.id`;
              finalJoin['through'] = {
                ...join?.through,
              };
              relation = Model.ManyToManyRelation;
              break;

            default:
              break;
          }

          mappings[key] = {
            relation,
            modelClass: (value as any).modelClass,
            join: finalJoin,
            filter: join?.filter,
          };
        }
        return mappings;
      },
    });
  };
}

export function HasMany(modelClass: () => any, join: IJoin) {
  return function (target: any, propertyKey: string) {
    const relations =
      Reflect.getMetadata(relationMetadataKey, target.constructor) || {};

    relations[propertyKey] = {
      relation: 'HasMany',
      modelClass,
      join,
    };

    Reflect.defineMetadata(relationMetadataKey, relations, target.constructor);
  };
}
export function BelongsToOne(modelClass: () => any, join: IJoin) {
  return function (target: any, propertyKey: string) {
    const relations =
      Reflect.getMetadata(relationMetadataKey, target.constructor) || {};

    relations[propertyKey] = {
      relation: 'BelongsToOne',
      modelClass,
      join,
    };

    Reflect.defineMetadata(relationMetadataKey, relations, target.constructor);
  };
}
export function HasOne(modelClass: () => any, join: IJoin) {
  return function (target: any, propertyKey: string) {
    const relations =
      Reflect.getMetadata(relationMetadataKey, target.constructor) || {};

    relations[propertyKey] = {
      relation: 'HasOne',
      modelClass,
      join,
    };

    Reflect.defineMetadata(relationMetadataKey, relations, target.constructor);
  };
}

export function ManyToMany(modelClass: () => any, join: IThrough) {
  return function (target: any, propertyKey: string) {
    const relations =
      Reflect.getMetadata(relationMetadataKey, target.constructor) || {};

    const throughTable = join.table;

    const finishJoin = {
      through: {
        from: `${throughTable}.${join?.from}`,
        to: `${throughTable}.${join?.to}`,
        extra: join?.extra,
      },
    };

    relations[propertyKey] = {
      relation: 'ManyToMany',
      modelClass,
      join: finishJoin,
    };

    Reflect.defineMetadata(relationMetadataKey, relations, target.constructor);
  };
}

export function Modifier() {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor,
  ) {
    const modifiers =
      Reflect.getMetadata(modifierMetadataKey, target.constructor) || {};
    modifiers[propertyKey] = descriptor.value;
    Reflect.defineMetadata(modifierMetadataKey, modifiers, target.constructor);
  };
}
