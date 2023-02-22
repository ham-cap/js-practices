const Memo = require('./memo.js');
const ReferenceEnquirer = require('./reference_enquirer');
const ListProvider = require('./list_provider');
const DestroyEnquirer = require('./destroy_enquirer');
const readline = require('node:readline/promises');
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('memo_app');
//const { Select } = require('enquirer');
const reader = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let selectedOption = ''

switch (process.argv[2]) {
  case "-l":
    selectedOption = new ListProvider();
    break;
  case "-r":
    selectedOption = new ReferenceEnquirer();
    break;
  case "-d":
    selectedOption = new DestroyEnquirer();
    break;
};

if (process.stdin.isTTY) {
  selectedOption.show();
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
