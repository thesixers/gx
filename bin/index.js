#!/usr/bin/env node
const {
  createExpressApp,
} = require("../create-express-app/create-express-app");
const { printManual } = require("../utils/printHelp");
const { promptForCMD } = require("../utils/promptForCmd");
const { versionNo } = require("../utils/version");

async function main() {
  const arguments = process.argv.slice(2);
  try {
    // get the commad
    const cmd = await promptForCMD(arguments[0]);

    if (cmd === "create-express-app") {
      await createExpressApp(arguments.splice(1));
      process.exit(0);
    }

    if (cmd === "--version" || cmd === "-v") {
      versionNo();
      process.exit(0);
    }

    if (cmd === "--help" || cmd === "-h") {
      await printManual();
      process.exit(0);
    }

    console.error(`gx error: "${cmd}" is not a valid gx command`);
    process.exit(1);
  } catch (error) {
    console.error(`${error.name} :`, error.message);
  }
}

main();
