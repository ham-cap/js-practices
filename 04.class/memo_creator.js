const readline = require("node:readline/promises");
const DbOperator = require("./db_operator.js");
const dbOperator = new DbOperator();
const reader = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

module.exports = class MemoCreator {
  create() {
    let lines = [];
    reader.on("line", (line) => {
      lines.push(line);
    });

    reader.on("close", () => {
      dbOperator.create(lines);
    });
  }
}
