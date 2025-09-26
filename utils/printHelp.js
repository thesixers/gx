const fs = require('fs/promises');
const path = require('path');


async function printManual(){
    let helpPath = path.join(__dirname, 'help.txt')
    let content = await fs.readFile(helpPath, "utf-8")
    console.log(content)
}

module.exports = { printManual }