import path from "path";
import { dirname } from "path";
import { fileURLToPath } from "url";
import { constants, copyFile } from "fs";
import { readdir, chmod, mkdir } from "fs/promises";

const copy = async () => {
  try {
    const __dirname = dirname(fileURLToPath(import.meta.url));
    const files = await readdir(path.join(__dirname, "files"));

    await mkdir(path.join(__dirname, "files_copy"));

    for (const file of files) {
      await chmod(path.join(__dirname, "files", file), 0o400);

      copyFile(
        path.join(__dirname, "files", file),
        path.join(__dirname, "files_copy", file),
        constants.COPYFILE_EXCL,
        (err) => {
          if (err) throw err;
        }
      );
    }
  } catch (err) {
    console.error(err);
    throw new Error("FS operation failed");
  }
};

await copy();
