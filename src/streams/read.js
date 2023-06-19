import { fileURLToPath } from "url";
import { dirname } from "path";
import { createReadStream } from "fs";
import * as path from "path";

const folderName = "files";
const fileName = "fileToRead.txt";

const read = async () => {
  try {
    const __dirname = dirname(fileURLToPath(import.meta.url));
    console.log(__dirname);

    const readStream = createReadStream(
      path.join(__dirname, folderName, fileName)
    );

    readStream.on("error", (err) => {
      throw err;
    });

    readStream.pipe(process.stdout);
  } catch (err) {
    console.error(err);
  }
};

await read();
