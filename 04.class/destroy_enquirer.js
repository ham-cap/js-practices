const DbOperator = require("./db_operator.js");
const dbOperator = new DbOperator();
const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("memo_app.sqlite3");
const { Select } = require("enquirer");
module.exports = class DestroyEnquirer {
  show() {
    dbOperator.makeArrayOfTitlesWithId().then((titles) => {
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
