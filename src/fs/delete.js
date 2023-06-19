import { fileURLToPath } from "url";
import path, { dirname } from "path";
import { unlink } from "fs/promises";

const folderName = "files";
const fileName = "fileToRemove.txt";

const remove = async () => {
  try {
    const filePath = path.join(
      dirname(fileURLToPath(import.meta.url)),
      folderName,
      fileName
    );

    await unlink(filePath);
  } catch (err) {
    throw new Error("FS operation failed");
  }
};

await remove();
