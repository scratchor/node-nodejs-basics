import { parentPort, workerData } from 'worker_threads';

// n should be received from main thread
export const nthFibonacci = (n) => n < 2 ? n : nthFibonacci(n - 1) + nthFibonacci(n - 2);

export const sendResult = () => {
    try {
        parentPort.postMessage(nthFibonacci(workerData.num));
    } catch (err) {
        if (!parentPort) {
            console.error('Probably, there is no main thread!');
        } else {
            console.error(err);
        }
    }
};

sendResult();
