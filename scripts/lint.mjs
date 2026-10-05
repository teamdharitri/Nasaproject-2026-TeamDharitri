import { readdir, readFile } from 'node:fs/promises';
import { spawnSync } from 'node:child_process';
import { join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('..', import.meta.url));
const ignoredDirectories = new Set(['.git', 'node_modules']);
const javascriptFiles = [];

async function collect(directory) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    if (entry.isDirectory()) {
      if (!ignoredDirectories.has(entry.name)) {
        await collect(join(directory, entry.name));
      }
      continue;
    }

    if (entry.name.endsWith('.js') || entry.name.endsWith('.mjs')) {
      javascriptFiles.push(join(directory, entry.name));
    }
  }
}

await collect(root);

for (const file of javascriptFiles) {
  const result = spawnSync(process.execPath, ['--check', file], { encoding: 'utf8' });
  if (result.status !== 0) {
    process.stderr.write(result.stderr);
    process.exit(result.status || 1);
  }

  const source = await readFile(file, 'utf8');
  if (/[ \t]+$/m.test(source)) {
    throw new Error(`Trailing whitespace found in ${relative(root, file)}`);
  }
}

console.log(`Lint passed for ${javascriptFiles.length} JavaScript files.`);
