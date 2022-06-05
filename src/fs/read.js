import { createReadStream, createWriteStream } from 'fs';
import path, {dirname} from "path";
import {fileURLToPath} from "url";

const folderName = 'files'
const fileName = 'fileToRead.txt'

const __dirname = dirname(fileURLToPath(import.meta.url));
const pathToFile = path.join(__dirname, folderName, fileName);

export const read = async () => {
    try {
        const inputFileStream = createReadStream(pathToFile);

        inputFileStream.on('error', (err) => {
            throw new Error('FS operation failed')
        })

        inputFileStream.pipe(process.stdout);
    } catch (err) {
        console.error(err)
    }
};

read();
