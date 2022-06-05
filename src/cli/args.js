export const parseArgs = () => {
    try {
        process.argv.slice(2).forEach((e, i, arr) => {
            if (e.match(/--/)) {
                const formattedElem = e.replace(/--/, '');
                console.log(`${formattedElem} is ${arr[i + 1]},`);
            }
        });
    } catch (err) {
        console.error(err);
    }
};

parseArgs();
