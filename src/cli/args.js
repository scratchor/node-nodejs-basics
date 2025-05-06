const parseArgs = () => {
  try {
    let string = "";

    process.argv.slice(2).forEach((e, i, arr) => {
      if (e.match(/--/)) {
        const formattedElem = e.replace(/--/, "");

        string += `${formattedElem} is ${arr[i + 1]}`;

        if (!(i === arr.length - 2)) {
          string += ", ";
        }
      }
    });

    console.log(string);
  } catch (err) {
    console.error(err);
  }
};

parseArgs();
