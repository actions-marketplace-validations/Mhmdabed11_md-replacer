const core = require("@actions/core");
const fs = require("fs");
const path = require("path");
const { spawn } = require("child_process");
const { Toolkit } = require("actions-toolkit");

const exec = (cmd, args = []) =>
  new Promise((resolve, reject) => {
    const app = spawn(cmd, args, { stdio: "inherit" });
    app.on("close", code => {
      if (code !== 0) {
        err = new Error(`Invalid status code: ${code}`);
        err.code = code;
        return reject(err);
      }
      return resolve(code);
    });
    app.on("error", reject);
  });

const commitFile = async () => {
  await exec("git", ["config", "--global", "user.email", "mohammad_aabed@hotmail.com"]);
  await exec("git", ["config", "--global", "user.name", "mhmdabed11"]);
  await exec("git", ["add", "README.md"]);
  await exec("git", ["commit", "-m", "update"]);
  await exec("git", ["push"]);
};

Toolkit.run(
  async tools => {
    const readmeContent = fs.readFileSync("./README.md", "utf-8").split("\n");
    console.log(readmeContent);
    await commitFile();
    tools.exit.success("Updated ");
  },
  {
    event: ["schedule", "workflow_dispatch"],
    token: "4fb3774e1a85590148bbedb9d36e3190e4840590"
  }
);
