import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { createWriteStream } from 'fs';
import * as path from 'path';

const folderName = 'files';
const fileName = 'fileToWrite.txt';

export const write = async () => {
    const __dirname = dirname(fileURLToPath(import.meta.url));
    const writeStream = createWriteStream(path.join(__dirname, folderName, fileName));

    writeStream.on('error', (err) => {
        throw err;
    });

    process.stdin.pipe(writeStream);
};

write();
