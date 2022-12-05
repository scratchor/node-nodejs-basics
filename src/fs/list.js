import { readdir } from 'fs/promises';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

const folderName = 'files';

export const list = async () => {
    try {
        const __dirname = dirname(fileURLToPath(import.meta.url));
        const files = await readdir(path.join(__dirname, folderName));

        for (const file of files) {
            console.log(file);
        }
    } catch (err) {
        throw new Error('FS operation failed');
    }
};

list();
