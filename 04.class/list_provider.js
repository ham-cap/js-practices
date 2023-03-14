const Memo = require("./memo.js");
const DbOperator = require("./db_operator.js");
const dbOperator = new DbOperator();

module.exports = class ListProvider {
  show() {
    dbOperator.loadMemos().then((memos) => {
      const titles = Memo.collectTitles(memos)
      titles.forEach(title =>
        console.log(title.name)
      );
      process.exit(0)
    });
  }
};
