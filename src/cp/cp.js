import cp from 'child_process'
import path, { dirname } from "path";
import { fileURLToPath } from "url";

export const spawnChildProcess = async (args) => {
    const __dirname = dirname(fileURLToPath(import.meta.url));
    const childURL = path.join(__dirname, 'files', 'script.js');

    const child = cp.fork(childURL, args);
    child.send(args);

    child.on('data', (msg) =>
        console.log(`Message: ${msg}`)
    );

    child.on('error', (error) =>
        console.log(`Child process error: ${error}`)
    );

    child.on('exit', (code) =>
        console.log(`Child process finished with code: ${code}`)
    );
};

spawnChildProcess(process.argv.slice(2))
