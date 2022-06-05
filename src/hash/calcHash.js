const { createHash } = await import('crypto');
import { createReadStream } from 'fs';
import path, {dirname} from "path";
import {fileURLToPath} from "url";
import {pipeline} from "stream";

const folderName = 'files'
const fileName = 'fileToCalculateHashFor.txt'

export const calculateHash = async () => {
    try {
        const filePath = path.join(dirname(fileURLToPath(import.meta.url)), folderName, fileName);
        const hash = createHash('sha256');
        const inputFileStream = createReadStream(filePath);

        pipeline(inputFileStream, hash.setEncoding('hex'), process.stdout,(err) => {
            if (err) {
                throw err;
            }
        })
    } catch (err) {
        console.error(err)
    }
};

calculateHash();
