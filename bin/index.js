#!/usr/bin/env node
const {
  createExpressApp,
} = require("../create-express-app/create-express-app");
const { promptForCMD } = require("../utils/promptForCmd");

async function main() {
  const arguments = process.argv.slice(2);
  try {
    // get the commad
    const cmd = await promptForCMD(arguments[0]);

    if (cmd === "create-express-app")
      return await createExpressApp(arguments.splice(1));

    return console.error(`gx error: "${cmd}" is not a valid gx command`);
  } catch (error) {
    console.error(`${error.name} :`, error.message);
  }
}

main();
