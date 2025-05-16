#!/usr/bin/env node

const { prompt } = require('enquirer');
const { createJsProject } = require('../utils/createProjectFolder');

let cmds = [
    "create-express-app",
    "install",
    "uninstall"
]
let templates = ["javascript", "typescript"]

const flags = process.argv.slice(2)
const cwd = process.cwd()


async function main(){
    try {
        const cmd = flags[0];
        let isCmdValid = checkCmd(flags[0])
        if(!isCmdValid) throw new Error("Gx Error: \""+flags[0]+ "\" is not a valid gx command");

        if(cmd === "create-express-app"){
            console.log(`creating express app in "${cwd}" please wait...`);

            let detailsArray = flags.slice(1)
            let details = parseDetails(detailsArray)

            if(detailsArray.length === 0){
                // prompt the user to enter folder name 
                let { foldername } = await promptfoldername()
                details["foldername"] = foldername
                // then prompt the user to choose a --template
                let { template }= await promptForTemplate()
                details["template"] = template
            }else{
                if(!details.foldername){
                    let { foldername } = await promptfoldername()
                    details["foldername"] = foldername
                }

                if(!details.template || !templates.includes(details.template)){
                    if(!templates.includes(details.template)){
                        console.error(`"${details.template}" is not a valid template`)
                    }
                    let { template }= await promptForTemplate()
                    details["template"] = template
                }
            }

            console.log(details);

            if(details.template === "javascript"){
                try {
                    await createJsProject(cwd, details)
                } catch (error) {
                    throw new Error(error);
                }
            }
        }

    } catch (error) {
        console.log(`${error.name} :`, error.message);
    }

}

function checkCmd(cmd){
    return cmds.includes(cmd)
}

function parseDetails(flags = []){
   try {
        let parsedDetailsObject = {}
        const flagSamples = ["--template", "--port", "--projectname"]

        flags.forEach((f, i) => {
            if(f.startsWith("*")){
                parsedDetailsObject["foldername"] = f.replace("*","")
            }

            if(f.startsWith("--")){
                if(flagSamples.includes(f)){
                    let fl = f.replaceAll("-", "")
                    parsedDetailsObject[fl] = flags[i+1]
                }else{
                    throw Error(`"${f}" is not a valid flag \nthe valid flags are viz: \n${flagSamples.toString().replace("[", "").replace("]", "").replaceAll(",", "\n")}`)
                }
            }
        })

        return parsedDetailsObject
   } catch (error) {
        throw new Error(error);
   }
}

async function promptfoldername(){
    try {
        let foldername = await prompt({
            type: "input",
            name: "foldername",
            message: "What is your project name?"
        })
    
        return foldername
    } catch (error) {
        throw new Error(error);
    }
}

async function promptForTemplate(){
    try {
        let template = await prompt({
            type: "select",
            name: "template",
            message: "Choose a project Template",
            choices: templates
        })
    
        return template
    } catch (error) {
        throw Error(error)
    }
}

main()