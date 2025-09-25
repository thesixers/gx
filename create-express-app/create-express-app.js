const { parseDetails } = require("./parseDetails");
const {
  createJsProject,
  createTsProject,
} = require("./createProjectFolder");

async function createExpressApp(arguments = []) {
  console.log("creating express app....");
  console.log("");
  const cwd = process.cwd();
  const { foldername, template, port, db } = await parseDetails(arguments);

  if (template === "js" || template === "javascript")
    return await createJsProject(cwd, { foldername, port, db });

  if (template === "ts" || template === "typescript")
    return await createTsProject(cwd, { foldername, port, db });

  console.error(`gx error: ${template} is not a invalid template`);

  return true;
}

module.exports = { createExpressApp };
