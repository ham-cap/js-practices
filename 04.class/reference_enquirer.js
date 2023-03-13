const DbOperator = require("./db_operator.js");
const dbOperator = new DbOperator();
const { Select } = require("enquirer");
module.exports = class ReferenceEnquirer {
  show() {
    dbOperator.loadMemos().then((memos) => {
      const titles = [];
      memos.forEach(function (memo) {
        titles.push({ name: memo.body[0], message: memo.body[0], value: memo.id })
      })
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
          const selectedMemo = memos.find(memo => memo.id === id);
          selectedMemo.body.map(line => console.log(line))
        })
        .catch(console.error);
    });
  }
};
