const Memo = require("./memo.js");
const DbOperator = require("./db_operator.js");
const { Select } = require("enquirer");

const dbOperator = new DbOperator();

module.exports = class ReferenceEnquirer {
  start() {
    dbOperator.loadMemos().then((memos) => {
      const titles = Memo.collectTitles(memos);
      const prompt = new Select({
        name: "memos",
        message: "Choose a memo you want to read.",
        choices: titles,
        result() {
          return this.focused.value;
        },
      });
      prompt
        .run()
        .then((id) => {
          const selectedMemo = memos.find((memo) => memo.id === id);
          selectedMemo.body.map((line) => console.log(line));
        })
        .catch(console.error);
    });
  }
};
