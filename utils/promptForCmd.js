const { prompt } = require('enquirer');

const cmds = [
    "create-express-app",
]


async function promptForCMD(cmd){
    try {
        if(!cmd){
            let { command } = await prompt({
                type: "select",
                name: "command",
                message: "Choose a command",
                choices: cmds
            })
        
            return command
        }
        return cmd
    } catch (error) {
        return console.error(error)
    }
}

module.exports = { promptForCMD }