import cp from "child_process";
import path, { dirname } from "path";
import { fileURLToPath } from "url";

const spawnChildProcess = async (args) => {
  const __dirname = dirname(fileURLToPath(import.meta.url));
  const childURL = path.join(__dirname, "files", "script.js");

  const child = cp.fork(childURL, args);
  child.send(args);

  child.on("data", (msg) => console.log(`Message: ${msg}`));

  child.on("error", (error) => console.log(`Child process error: ${error}`));

  child.on("exit", (code) =>
    console.log(`Child process finished with code: ${code}`)
  );
};

// Put your arguments in function call to test this functionality
spawnChildProcess(["someArgument1", "someArgument2"]);
// spawnChildProcess(process.argv.slice(2));
