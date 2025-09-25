const { prompt } = require('enquirer');

let templates = ["javascript", "typescript"]

async function promptForTemplate(){
    try {
        let { template } = await prompt({
            type: "select",
            name: "template",
            message: "Choose a project Template",
            choices: templates
        })
    
        return template
    } catch (error) {
        return console.error("gx error:", error)
    }
}

module.exports = { promptForTemplate }