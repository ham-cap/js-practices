const DbOperator = require("./db_operator.js");
const dbOperator = new DbOperator();

module.exports = class ListProvider {
  show() {
    dbOperator.loadMemos().then((memos) => {
      const titles = [];
      memos.forEach(function (memo) {
        titles.push({ name: memo.body[0], message: memo.body[0] })
      })
      titles.forEach(title =>
        console.log(title.name)
      );
      process.exit(0)
    });
  }
};
