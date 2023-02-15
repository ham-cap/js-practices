const Memo = require('./memo.js');
const readline = require('node:readline/promises');
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('memo_app');
const { Select } = require('enquirer');
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
          db.close();
        });
      });
    });
  }else if (process.argv[2] == '-r'){
    db.all('SELECT body FROM memos', function(err, rows) {
      if (err) {
        throw err;
      }
      const memos = []
      const titles = []
      let index = 1
      rows.forEach(function (row) {
        const array = row.body.split(',');
        memos.push(array);
        titles.push({name: array[0], message: `messageが表示されてる${array[0]}`, value: index});
        index += 1;
      });
      const prompt = new Select({
        name: 'memos',
        message: 'Choose a memo.',
        choices: titles,
        result() {
          return this.focused.value;
        }
      });
      prompt.run()
        .then(answer => memos[answer - 1].forEach(line => console.log(line)))
        .catch(console.error);
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
