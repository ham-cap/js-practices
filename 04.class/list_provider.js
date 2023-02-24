const DbOperator = require("./db_operator.js");
const dbOperator = new DbOperator();

module.exports = class ListProvider {
  show() {
    dbOperator.makeArrayOfTitles().then((titles) => {
      titles.forEach(function (row) {
        console.log(row);
      });
    });
  }
};
