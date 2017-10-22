const ghpages = require("gh-pages");
const path = require("path");
const execSync = require("child_process").execSync;

const token = process.env.GITHUB_TOKEN;
const repo = "github.com/hnrysmth/tunnelbana.git";

if (!token) {
  process.stderr.write("Deploy failed due to missing token");
  process.exit(-1);
}

const directory = path.join(__dirname, "gh-pages");
const run = cmd => {
  process.stdout.write(execSync(cmd, { cwd: directory }).toString());
};

const options = {
  branch: "gh-pages",
  clone: "../gh-pages",
  message: "🚂",
  push: false,
  repo: `git@${repo}`,
  src: ["index.html", "index.css", "tunnelbana.js"]
};

ghpages.publish(".", options, () => {
  run("git reset --soft HEAD~1");
  run("git commit --all --amend --no-edit --reset-author --message '🚂'");
  run(`git push --force --quiet https://${token}@${repo} master`);
});
