import {Memo} from './memo.js'
import * as readline from "readline";
import sqlite3 from "sqlite3";
const db = new sqlite3.Database('memo_app');
const reader = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

if (process.stdin.isTTY) {
  //一覧表示
  if (process.argv[2] == '-l'){
    db.serialize(() => {
      db.all('SELECT body FROM memos', function(err, rows) {
        if (err) {
          throw err;
        }
        rows.forEach(function (row) {
          const array = row.body.split(',');
          console.log(array[0]);
        });
      })
      db.close((err) => {
        if(err){
          throw err;
        }
        db.close();
      });
    });
  };
} else {
  // 入力の受け取り
  let lines = [];
  reader.on('line', (line) => {
    lines.push(line);
  });
  
  // Memoインスタンスの生成と保存
  reader.on("close", () => {
    const memo = new Memo(lines);
    db.serialize(() => {
      db.run('CREATE TABLE if not exists memos(id INTEGER PRIMARY KEY, body TEXT)');
      db.run('INSERT INTO memos (body) values(?)', [memo.lines]);
    });
  });
};
