import path from 'path';
import {dirname} from "path";
import {fileURLToPath} from "url";
import {access} from 'fs/promises';
import { rename as renameMethod } from 'fs';

const folderName = 'files'
const oldName = 'wrongFilename.txt'
const newName = 'properFilename.md'

const checkIsFileExist = async (path) => {
    try {
        await access(path);
        return true
    } catch (err) {
        return false
    }
}

export const rename = async () => {
    try {
        const folderPath = path.join(dirname(fileURLToPath(import.meta.url)), folderName);
        const isFileExist = await checkIsFileExist(path.join(folderPath, newName))

        if (isFileExist) {
            throw new Error('FS operation failed');
        }

        renameMethod(path.join(folderPath,  oldName), path.join(folderPath, newName), (err) => {
            if (err) throw new Error('FS operation failed');
        });
    } catch (err) {
        console.log(err);
    }
};

rename()
