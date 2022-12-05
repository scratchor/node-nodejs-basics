import { cpus } from 'os';
import { Worker } from 'worker_threads';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import * as path from 'path';

const numberToStartWith = 10;
const workerModuleName = 'worker.js';

const createWorker = (pathToWorkerModule, num) => {
    return new Promise((res, rej) => {
        const worker = new Worker(pathToWorkerModule, {
            workerData: {
                num: num,
            },
        });

        worker.on('message', (result) => {
            res(result);
        });
        worker.on('error', (error) => {
            rej();
        });
    });
};

export const performCalculations = async () => {
    try {
        const __dirname = dirname(fileURLToPath(import.meta.url));
        const pathToWorkerModule = path.join(__dirname, workerModuleName);

        const numsToCalc = Array(cpus().length)
            .fill(numberToStartWith)
            .map((e, i) => e + i);
        const workersPromises = numsToCalc.map((num) => createWorker(pathToWorkerModule, num));

        const result = await Promise.allSettled(workersPromises);

        console.log(
            result.map((e) => {
                return {
                    status: e.status === 'fulfilled' ? 'resolved' : 'error',
                    data: e.value ? e.value : null,
                };
            })
        );
    } catch (err) {
        console.error(err);
    }
};

performCalculations();
