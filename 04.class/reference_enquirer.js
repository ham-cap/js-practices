const DbOperator = require('./db_operator.js');
const dbOperator = new DbOperator();
const { Select } = require('enquirer');
module.exports = class referenceEnquirer {
  ask(){
    dbOperator.makeArraysOfMemosAndTitles()
      .then(([memos, titles]) => {
        const prompt = new Select({
          name: 'memos',
          message: 'Choose a memo you want to read.',
          choices: titles,
          result() {
            return this.focused.value;
          }
        });
        prompt.run()
          .then(id => memos[id - 1].forEach(line => console.log(line)))
          .catch(console.error);
      })
  }
}
