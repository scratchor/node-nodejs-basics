import * as path from 'path';
import { release, version } from 'os';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { readFile } from 'fs/promises';
import { createServer as createServerHttp } from 'http';

await import('./files/c.js');

const random = Math.random();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(fileURLToPath(import.meta.url));

let unknownObject;

try {
    if (random > 0.5) {
        unknownObject = await readFile(path.join(__dirname, './files/a.json'), { encoding: 'utf8' });
    } else {
        unknownObject = await readFile(path.join(__dirname, './files/b.json'), { encoding: 'utf8' });
    }
} catch (err) {
    console.error(err);
}

console.log(`Release ${release()}`);
console.log(`Version ${version()}`);
console.log(`Path segment separator is "${path.sep}"`);

console.log(`Path to current file is ${__filename}`);
console.log(`Path to current directory is ${__dirname}`);

const createMyServer = createServerHttp((_, res) => {
    res.end('Request accepted');
});

export { unknownObject, createMyServer };
