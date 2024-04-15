const { readdir, readFile, writeFile } = require('fs')

readdir('./macimacko', (err, files) => {
    console.log(files)
    let output = []
    for (const i in files){
        readFile(`./macimacko/${files[i]}`, { encoding: 'utf-8'} , (err, data) => {
            output[i] = data
            if (files.length === output.filter(x => x !== null).length){
                writeFile('./output.txt', output.join('\n'), () => {
                    console.log('Vége.')
                    // CALLBACK HELL!!!
                })
            }
        })
    }
})

