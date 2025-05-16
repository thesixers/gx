const fs = require('fs/promises');
const path = require('path');

// const readFilePath = path.join(__dirname, "read/flags.js")

async function readWrite(readFile, writeFIle){
    try {
        let fileContent = await fs.readFile(readFile, "utf8")

        let writeFolder = process.cwd()

        await fs.writeFile(writeFIle, fileContent)

        console.log("file has been written succesfully");
    } catch (error) {
        console.log(error);
    }
}

readWrite()