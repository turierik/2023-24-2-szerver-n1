const { readdir, readFile, writeFile } = require("fs/promises");

readdir("./macimacko")
    .then(files =>
        Promise.all(
            files.map(file =>
                readFile(`./macimacko/${file}`, { encoding: "utf-8" })
            )
        )
    )
    .then(contents => writeFile('./output.txt', contents.join("\n")))
    .then(() => console.log('Vége.'))
