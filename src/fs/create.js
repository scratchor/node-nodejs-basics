import { writeFile } from "fs";
import { fileURLToPath } from "url";
import path, { dirname } from "path";
import { access } from "fs/promises";

const folderName = "files";
const fileName = "fresh.txt";
const content = "I am fresh and young";
const __dirname = dirname(fileURLToPath(import.meta.url));
const pathToFile = path.join(__dirname, folderName, fileName);

const create = async () => {
  try {
    await access(pathToFile);
    throw new Error("FS operation failed");
  } catch (err) {
    if (err.code === "ENOENT") {
      writeFile(pathToFile, content, (err) => {
        if (err) throw err;
      });
    } else {
      console.error(err);
    }
  }
};

await create();
