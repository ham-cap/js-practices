const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('memo_app');
const { Select } = require('enquirer');
module.exports = class DbOperator {
  displayMemosAndLetUsersChooseOneOfThem(){
    const makeArraysOfMemosAndTitles = function() {
      return new Promise((resolve, reject) => {
        db.serialize(() => {
          db.all('SELECT id, body FROM memos', function(err, rows) {
            if (err) return reject(err)
            const memos = []
            const titles = []
            rows.forEach(function (row) {
              const body = row.body.split(',');
              const id = row.id;
              memos.push(body);
              titles.push({name: body[0], message: body[0], value: id});
            })
            resolve([memos, titles])
          })
        })
      });
    }
    
    makeArraysOfMemosAndTitles().
    //then(rows => {
    //  const memos = []
    //  const titles = []
    //  rows.forEach(function (row) {
    //    const body = row.body.split(',');
    //    const id = row.id;
    //    memos.push(body);
    //    titles.push({name: body[0], message: body[0], value: id});
    //  })
    //  return [memos, titles]
    //})
      then(([memos, titles]) => {
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
  };
};

    //});
    //console.log(memos)
    //console.log(titles)
