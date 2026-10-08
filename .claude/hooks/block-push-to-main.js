// PreToolUse hook (Bash): blocks `git push` that targets main/master.
const { execSync } = require("child_process");

const PROTECTED = ["main", "master"];

let input = "";
process.stdin.on("data", (d) => (input += d));
process.stdin.on("end", () => {
  const command = JSON.parse(input).tool_input?.command ?? "";
  if (!/(^|[;&|(]\s*)git\s+(?:(?:-C|-c)\s+\S+\s+|--\S+\s+)*push\b/.test(command)) return;

  const tokens = command.split(/\s+/);
  // Destination of a refspec: drop leading "+", keep the part after the last ":", drop "refs/heads/" and quotes.
  const dest = (t) => t.replace(/^\+/, "").split(":").pop().replace(/^refs\/heads\//, "").replace(/["']/g, "");
  const namesProtected = tokens.some((t) => PROTECTED.includes(dest(t)));

  let onProtected = false;
  try {
    const branch = execSync("git rev-parse --abbrev-ref HEAD", { encoding: "utf8" }).trim();
    onProtected = PROTECTED.includes(branch);
  } catch {}

  if (namesProtected || onProtected) {
    console.error("Blocked: pushing to main/master is not allowed. Push a feature branch and open a pull request.");
    process.exit(2);
  }
});
