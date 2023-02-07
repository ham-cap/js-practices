import {Memo} from './memo.js'
import * as readline from "readline";
import sqlite3 from "sqlite3";
const db = new sqlite3.Database('memo_app'); // データベースを作成
const reader = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// メモの保存
let lines = [];
reader.on('line', (line) => {
    lines.push(line);
    const memo = new Memo(lines);
    db.serialize(() => {
      db.run('CREATE TABLE if not exists memos(id INTEGER PRIMARY KEY, body TEXT)');// テーブルの作成
      db.run('INSERT INTO memos (body) values(?)', [memo.lines]);
    });
});
// reader.on('close', () => {});
// return db.get('SELECT * FROM memos', function(err, row) {
//   if (err) {
//     throw err;
//   }
//   console.log(row.id)
//   console.log(row.body)
// });
console.log(process.argv[2]);
