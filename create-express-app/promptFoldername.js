
const { prompt } = require('enquirer');

async function promptfoldername(){
    try {
        let { foldername } = await prompt({
            type: "input",
            name: "foldername",
            message: "What is your project name?"
        })
    
        return foldername
    } catch (error) {
        console.error("gx error:", error)
    }
}

module.exports = { promptfoldername }