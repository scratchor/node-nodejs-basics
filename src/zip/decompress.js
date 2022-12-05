import { createReadStream, createWriteStream } from 'fs';
import { pipeline } from 'stream/promises';
import { createGunzip } from 'zlib';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

const folderName = 'files';
const archiveFile = 'archive.gz';
const destinationFile = 'fileToCompress.txt';

export const decompress = async () => {
    try {
        const folderPath = path.join(dirname(fileURLToPath(import.meta.url)), folderName);
        const gunzipTransformStream = createGunzip();
        const readStream = createReadStream(path.join(folderPath, archiveFile));
        const writeStream = createWriteStream(path.join(folderPath, destinationFile));

        await pipeline(readStream, gunzipTransformStream, writeStream);
    } catch (err) {
        console.error(err);
    }
};

decompress();
