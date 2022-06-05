export const parseEnv = () => {
    try {
        const variables = Object.keys(process.env).filter(e => e.match(/RSS_/))

        variables.forEach(e => {
            console.log(`${e}=${process.env[e]};`)
        })
    } catch (err) {
        console.error(err);
    }
};

parseEnv();
