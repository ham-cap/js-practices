const Memo = require("./memo.js");
const DbOperator = require("./db_operator.js");
const sqlite3 = require("sqlite3").verbose();
const { Select } = require("enquirer");

const dbOperator = new DbOperator();
const db = new sqlite3.Database("memo_app.sqlite3");

module.exports = class DestroyEnquirer {
  start() {
    dbOperator.loadMemos().then((memos) => {
      const titles = Memo.collectTitles(memos);
      const prompt = new Select({
        name: "memos",
        message: "Choose a memo you want to delete.",
        choices: titles,
        result() {
          return this.focused.value;
        },
      });
      prompt
        .run()
        .then((id) => db.run("DELETE FROM memos WHERE id = ?", id))
        .catch(console.error);
    });
  }
};
