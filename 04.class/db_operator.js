const Memo = require('./memo.js');
const readline = require('node:readline/promises');
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('memo_app.sqlite3');
const reader = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

module.exports = class DbOperator {
  makeArraysOfMemosAndTitles() {
    return new Promise((resolve, reject) => {
      db.serialize(() => {
        db.all('SELECT id, body FROM memos', function(err, rows) {
          if (err) return reject(err)
          const memos = {}
          const titles = []
          rows.forEach(function (row) {
            const body = row.body.split(',');
            const id = row.id;
            memos[id] = body;
            titles.push({name: body[0], message: body[0], value: id});
          })
          resolve([memos, titles])
        })
      })
    });
  }

  makeArrayOfTitles() {
    return new Promise((resolve, reject) => {
      db.serialize(() => {
        db.all('SELECT body FROM memos', function(err, rows) {
          if (err) return reject(err)
          const titles = [];
          rows.forEach(function (row) {
            const body = row.body.split(',');
            titles.push(body[0]);
            db.close();
          })
          resolve(titles);
        })
        db.close();
      })
    });
  }

  makeArrayOfTitlesWithId() {
    return new Promise((resolve, reject) => {
      db.serialize(() => {
        db.all('SELECT id, body FROM memos', function(err, rows) {
          if (err) return reject(err)
          const titles = []
          rows.forEach(function (row) {
            const body = row.body.split(',');
            const id = row.id;
            titles.push({name: body[0], message: body[0], value: id});
          })
          resolve(titles)
        })
      })
    });
  }

  create (){
    let lines = [];
    reader.on('line', (line) => {
      lines.push(line);
    });
    
    reader.on("close", () => {
      const memo = new Memo(lines);
      db.serialize(() => {
        db.run('CREATE TABLE if not exists memos(id INTEGER PRIMARY KEY, body TEXT)');
        db.run('INSERT INTO memos (body) values(?)', [memo.lines]);
      });
    });
  }
};
