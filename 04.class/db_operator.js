const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('memo_app');
module.exports = class DbOperator {
    makeArraysOfMemosAndTitles() {
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
  };
