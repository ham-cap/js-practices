import {Memo} from './memo.js'
import * as readline from "readline";
import sqlite3 from "sqlite3";
const db = new sqlite3.Database('memo_app'); // データベースを作成
const reader = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let lines = [];
reader.on('line', (line) => {
    lines.push(line);
    const memo = new Memo(lines);
    // console.log(memo.lines)// linesプロパティにアクセスできているか確認
    db.serialize(() => {
      db.run('CREATE TABLE if not exists memos(id INTEGER PRIMARY KEY, body TEXT)');// テーブルの作成
      db.run('INSERT INTO memos (body) values(?)', [memo.lines]);
      return db.get('SELECT * FROM memos', function(err, row) {
        if (err) {
          throw err;
        }
        console.log(row.id)
        console.log(row.body)
      });
    });
});

// reader.on('close', () => {
//   console.log(data.body);
//   console.log(typeof data);
//   console.log(data.constructor.name);
// });



// let lines = [];
// const memo = reader.on('line', (line) => {
//   new Memo().lines.push(line)
// });

// reader.on('close', () => {
//   console.log(memo.constructor.name)
//   // console.log(lines);
// });


// reader.on('close', () => {
//   const memo = new Memo()
//   memo.lines = lines
//   console.log(memo.lines)
// });


// reader.on('close', () => {
//   console.log(`これが最終的なlines: ${memo.lines}`);
// })
// 
// reader.on('close', () => {
//   console.log(memo.history);
// })
