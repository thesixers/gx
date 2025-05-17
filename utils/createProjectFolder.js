const fs = require('fs/promises');
const path = require('path');
const latestVersion = require('latest-version');

const jsDir = path.join(__dirname.replace("/utils", ""), "templates/Javascript")
const tsDir = path.join(__dirname.replace("/utils", ""), "templates/typescript")

async function createJsProject(dir, details){
    try {
        let url = path.join(dir, details.foldername)
        let data = await generatePackageJson(details)
        await fs.mkdir(url, {recursive: true})
        let bareFiles = [
            "README.md", "package.json", ".env",
            ".gitignore", "public/index.html","src/server.js", 
            "src/routes/mainRoutes.js", "src/controllers/mainController.js", 
            "src/middleware/index.js"
        ]
        let bareFolders = [
            "public", "src", 
            "src/routes", "src/controllers", 
            "src/middleware", "views"
        ]
        

        console.log("\n \n writing to project 😄.....");

        // create the folders
        for (const folder of bareFolders) {
            await fs.mkdir(`${url}/${folder}`, {recursive: true}) 
        }
        // create the files
        for (const file of bareFiles) {
            if(file === "package.json"){
                await fs.writeFile(`${url}/${file}`, JSON.stringify(data, null, 2))
            }else if(file === ".env"){
                await fs.writeFile(`${url}/${file}`, "PORT=3000")
            }else if(file === ".gitignore"){
                await fs.writeFile(`${url}/${file}`, "node_modules")
            }
            else{
                await readWrite(`${jsDir}/${file}`, `${url}/${file}`) 
            }
        } 

        console.log(`\n Project has been created run \n \n cd ${details.foldername} \n npm install \n npm start`);

    } catch (error) {
        throw Error(error)
    }
}

async function createTsProject(dir, details){
    try {
        let url = path.join(dir, details.foldername)
        let data = await generatePackageJson(details)
        await fs.mkdir(url, {recursive: true})
        let bareFiles = [
            "README.md", "package.json", ".env", 
            ".gitignore", "public/index.html","src/server.ts",  "tsconfig.json",
            "src/routes/mainRoutes.ts", "src/controllers/mainController.ts", 
            "src/middleware/index.ts"
        ]
        let bareFolders = [
            "public", "src", 
            "src/routes", "src/controllers", 
            "src/middleware", "views"
        ]
        console.log("\n \n writing to project 😄.....");

        // create the folders
        for (const folder of bareFolders) {
            await fs.mkdir(`${url}/${folder}`, {recursive: true}) 
        }
        // create the files
        for (const file of bareFiles) {
            if(file === "package.json"){
                await fs.writeFile(`${url}/${file}`, JSON.stringify(data, null, 2))
            }else if(file === ".env"){
                await fs.writeFile(`${url}/${file}`, "PORT=3000")
            }else if(file === ".gitignore"){
                await fs.writeFile(`${url}/${file}`, "node_modules")
            }else{
                await readWrite(`${tsDir}/${file}`, `${url}/${file}`) 
            }
        } 

        console.log(` \n Project has been created run: \n \n cd ${details.foldername} \n npm install \n npx tsc --init \n npm start`);

    } catch (error) {
        throw new Error(error);   
    }
}

async function readWrite(readFile, writeFIle){
    try {
        let fileContent = await fs.readFile(readFile, "utf8")

        let writeFolder = process.cwd()

        await fs.writeFile(writeFIle, fileContent)
    } catch (error) {
        console.log(error);
        throw Error(error)
    }
}

async function getLatestVersion(pkgName) {
  try {
    const version = await latestVersion.default(pkgName);
    return version;
  } catch (err) {
    // console.error(`Failed to get version for ${pkgName}`, err);
    // throw Error(`Failed to get version for ${pkgName}`, err)
    return false
  }
}
  
async function generatePackageJson(details) {
    console.log("\n Generating package.json file 😁");
    try {
        const expressVersion = await getLatestVersion('express');
        const morganVersion = await getLatestVersion('morgan');
        const corsVersion = await getLatestVersion('cors');
        const base = {
        name: details.foldername,
        version: "1.0.0",
        main: "src/server.js",
        scripts: {
            start: details.template === 'typescript' ? "tsc && node dist/server.js" : "node --watch src/server.js"
        },
        author: "",
        license: "ISC",
        dependencies: {
            express: `^${expressVersion ? expressVersion : "5.1.0"}`,
            morgan: `^${morganVersion ? morganVersion : "1.10.0"}`,
            cors: `^${corsVersion ? corsVersion : "2.8.5"}`
        },
        };
    
        if (details.template === 'typescript') {
        const tsVersion = await getLatestVersion('typescript');
        const typesNode = await getLatestVersion('@types/node');
        const typesExpress = await getLatestVersion('@types/express');
        const tsNodeDev = await getLatestVersion('ts-node-dev');
        const tsCors = await getLatestVersion('@types/cors');
        const tsMorgan = await getLatestVersion('@types/morgan');
    
        base.devDependencies = {
            typescript: `^${tsVersion ? tsVersion : "5.8.3"}`,
            '@types/node': `^${typesNode ? typesNode : "22.15.18"}`,
            '@types/express': `^${typesExpress ? typesExpress : "5.0.2"}`,
            'ts-node-dev': `^${tsNodeDev ? tsNodeDev : "2.0.0"}`,
            '@types/cors': `^${tsCors ? tsCors : "2.8.18"}`,
            '@types/morgan': `^${tsMorgan ? tsMorgan : "1.9.9"}`
        };
        }
    
        return base;
    } catch (error) {
        throw new Error(error);
    }
}
  


module.exports = { createJsProject, createTsProject}