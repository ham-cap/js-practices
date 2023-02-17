const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('memo_app');
const { Select } = require('enquirer');
module.exports = class DbOperator {
  displayMemosAndLetUsersChooseOneOfThem(){
    db.all('SELECT id, body FROM memos', function(err, rows) {
      if (err) {
        throw err;
      }
      const memos = []
      const titles = []
      rows.forEach(function (row) {
        const body = row.body.split(',');
        const id = row.id;
        memos.push(body);
        titles.push({name: body[0], message: body[0], value: id});
      });
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
    });
  };
};
