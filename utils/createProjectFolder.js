const fs = require('fs/promises');
const path = require('path');
const latestVersion = require('latest-version');

const jsDir = path.join(__dirname.replace("/utils", ""), "templates/Javascript")

async function createJsProject(dir, details){
    let url = path.join(dir, details.foldername)
    let projectDir = await fs.mkdir(url, {recursive: true})
    let bareFiles = ["README.md", "package.json", ".env", ".gitignore", "public/index.html","src/server.js", "src/routes/mainRoutes.js", "src/controllers/mainController.js", "src/middleware/index.js"]
    let bareFolders = ["public", "src", "src/routes", "src/controllers", "src/middleware", "views"]


    console.log("\n \n \n writing to project .....");

    // create the folders
    for (const folder of bareFolders) {
        await fs.mkdir(`${url}/${folder}`, {recursive: true}) 
    }
    // create the files
    for (const file of bareFiles) {
        if(file === "package.json"){
            let data = await generatePackageJson(details)
            await fs.writeFile(`${url}/${file}`, JSON.stringify(data, null, 2))
        }else if(file !== "package.json"){
            await readWrite(`${jsDir}/${file}`, `${url}/${file}`) 
        }
    } 

    console.log(`\n \n \n Project has been created run \n \n cd ${details.foldername} \n npm install \n npm start`);

}

async function readWrite(readFile, writeFIle){
    try {
        let fileContent = await fs.readFile(readFile, "utf8")

        let writeFolder = process.cwd()

        await fs.writeFile(writeFIle, fileContent)
    } catch (error) {
        console.log(error);
    }
}

function createTsProject(dir, details){
    
}


async function getLatestVersion(pkgName) {
  try {
    const version = await latestVersion.default(pkgName);
    return version;
  } catch (err) {
    console.error(`Failed to get version for ${pkgName}`, err);
    return null;
  }
}
  
async function generatePackageJson(details) {
    const expressVersion = await getLatestVersion('express');
    const morganVersion = await getLatestVersion('morgan');
    const corsVersion = await getLatestVersion('cors');
    const base = {
      name: details.foldername,
      version: "1.0.0",
      main: "src/server.js",
      scripts: {
        start: details.template === 'typescript' ? "tsc && node dist/index.js" : "node --watch src/server.js"
      },
      author: "",
      license: "ISC",
      dependencies: {
        express: `^${expressVersion}`,
        morgan: `^${morganVersion}`,
        cors: `^${corsVersion}`
      },
    };
  
    if (details.template === 'typescript') {
      const tsVersion = await getLatestVersion('typescript');
      const typesNode = await getLatestVersion('@types/node');
      const typesExpress = await getLatestVersion('@types/express');
      const tsNodeDev = await getLatestVersion('ts-node-dev');
  
      base.devDependencies = {
        typescript: `^${tsVersion}`,
        '@types/node': `^${typesNode}`,
        '@types/express': `^${typesExpress}`,
        'ts-node-dev': `^${tsNodeDev}`
      };
    }
  
    return base;
}
  


module.exports = { createJsProject, createTsProject}