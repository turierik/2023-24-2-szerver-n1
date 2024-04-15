const { readdir, readFile, writeFile } = require("fs/promises")

;(async () => {
    const files = await readdir('./macimacko')
    console.log(files)
    const data = await Promise.all(
        files.map(file => readFile(`./macimacko/${file}`, { encoding: 'utf-8'}))
    )
    await writeFile('./output.txt', data.join("\n"))
    console.log('Vége')
})()
