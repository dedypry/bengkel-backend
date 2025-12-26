import { readdirSync, statSync } from 'fs';
import { execSync } from 'child_process';
import path from 'path';

const appsDir = path.join(process.cwd(), 'apps');

const folders = readdirSync(appsDir).filter((name) => {
  const fullPath = path.join(appsDir, name);
  return statSync(fullPath).isDirectory();
});

console.log(`🔍 Found apps:`, folders);

for (const folder of folders) {
  console.log(`🚀 Building ${folder}...`);
  execSync(`pnpm build ${folder}`, { stdio: 'inherit' });
}

console.log('✅ All apps built successfully');
