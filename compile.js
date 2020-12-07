const fs = require("fs");
const path = require("path");
const out="out";

async function main() {
  fs.rmdirSync(path.join(__dirname, out), {recursive: true});
  mkDir(path.join(__dirname, out));
  await parseFiles(
    path.join(__dirname, "src"),
    path.join(__dirname, out)
  );
}

function parseFiles(cwd, cwdout) {
  var cwdFiles = fs.readdirSync(cwd);
  for (var i of cwdFiles) {
    if (fs.statSync(path.join(cwd, i)).isDirectory()) {
      mkDir(path.join(cwdout, i));
      parseFiles(path.join(cwd, i), path.join(cwdout, i));
    } else {
      if (path.parse(path.join(cwd, i)).ext == ".ts") continue;
      fs.writeFileSync(path.join(cwdout, i), fs.readFileSync(path.join(cwd, i)));
    }
  }
}

function mkDir(pathname) {
  if (!fs.existsSync(pathname)) {
    fs.mkdirSync(pathname);
  }
}

main();