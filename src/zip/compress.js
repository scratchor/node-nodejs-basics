import { createReadStream, createWriteStream } from 'fs';
import { pipeline } from "stream/promises";
import { createGzip } from "zlib";
import path, { dirname } from "path";
import { fileURLToPath } from "url";


const folderName = 'files'
const sourceFile = 'fileToCompress.txt'
const archiveFile = 'archive.gz'

export const compress = async () => {
    try {
        const folderPath = path.join(dirname(fileURLToPath(import.meta.url)), folderName);
        const gzipTransformStream = createGzip();
        const readStream = createReadStream(path.join(folderPath, sourceFile));
        const writeStream = createWriteStream(path.join(folderPath, archiveFile));

       await pipeline(readStream, gzipTransformStream, writeStream)
    } catch (err) {
        console.error(err)
    }
};

compress();
