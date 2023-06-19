const parseEnv = () => {
  try {
    let string = "";
    const variables = Object.keys(process.env).filter((e) => e.match(/RSS_/));

    variables.forEach((e, i, arr) => {
      string += `${e}=${process.env[e]}`;

      if (!(i === arr.length - 1)) {
        string += "; ";
      }
    });

    console.log(string);
  } catch (err) {
    console.error(err);
  }
};

parseEnv();
