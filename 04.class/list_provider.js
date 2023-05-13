const Memo = require("./memo.js");
const DbOperator = require("./db_operator.js");

const dbOperator = new DbOperator();

module.exports = class ListProvider {
  start() {
    dbOperator.loadMemos().then((memos) => {
      const choices = Memo.createChoices(memos);
      choices.forEach((choice) => console.log(choice.name));
      process.exit(0);
    });
  }
};
