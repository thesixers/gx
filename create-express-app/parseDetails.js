const { promptfoldername } = require("./promptFoldername");
const { promptForTemplate } = require("./promptForTemplate");

const attributes = ["foldername", "template", "port", "db", "temp"];

async function parseDetails(arguments = []) {
  let details = { foldername: "", template: "", port: 3000, db: "" };
  if (arguments.length === 0) {
    details["foldername"] = await promptfoldername();
    details["template"] = await promptForTemplate();
    return details;
  }
  //    nnamdi template:js port:300 db:mongodb
  details["foldername"] = arguments[0];

  for (const argument of arguments) {
    if (argument.includes(":")) {
      let [key, value] = argument.split(":");
      if (attributes.includes(key)) {
        key === "temp" ? (details["template"] = value) : (details[key] = value);
      }
    }
  }

  if (!details.foldername) {
    details["foldername"] = await promptfoldername();
  }


  if (!details.template) {
    details["template"] = await promptForTemplate();
  }

  return details;
}

module.exports = { parseDetails };
