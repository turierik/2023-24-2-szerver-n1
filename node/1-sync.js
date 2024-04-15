const { readdirSync, readFileSync, writeFileSync } = require('fs')

const files = readdirSync('./macimacko')
console.log(files)

let output = ""
for (const file of files){
    const content = readFileSync(`./macimacko/${file}`, { encoding: 'utf-8' })
    output += content + "\n"
}
writeFileSync('./output.txt', output)
