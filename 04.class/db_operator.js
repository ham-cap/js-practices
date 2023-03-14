const Memo = require("./memo.js");
const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("memo_app.sqlite3");

module.exports = class DbOperator {
  loadMemos() {
    return new Promise((resolve, reject) => {
      db.serialize(() => {
        db.all("SELECT id, body FROM memos", function (err, rows) {
          if (err) return reject(err);
          const memos = [];
          rows.forEach(function (row) {
            const body = row.body.split(",");
            memos.push(new Memo(row.id, body))
          })
          resolve(memos);
        });
      });
    });
  }

  create(lines) {
      db.serialize(() => {
        db.run(
          "CREATE TABLE if not exists memos(id INTEGER PRIMARY KEY, body TEXT)"
        );
        db.run("INSERT INTO memos (body) values(?)", [lines]);
      });
  }
};
