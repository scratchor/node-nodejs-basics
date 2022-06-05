import { pipeline, Transform } from 'stream';

export const transform = async () => {
    try {
        const reverseStream = new Transform({
            transform(chunk, encoding, callback) {
                callback(null, chunk.toString().split('').reverse().join(''));
            },
        });

        pipeline(process.stdin, reverseStream, process.stdout, (err) => {
            if (err) {
                throw err;
            }
        });
    } catch (err) {
        console.error(err);
    }
};

transform();
