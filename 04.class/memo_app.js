const Memo = require('./memo.js');
const DbOperator = require('./db_operator.js');
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
    const dbOperator = new DbOperator();
    dbOperator.displayMemosAndLetUsersChooseOneOfThem();
    //db.all('SELECT id, body FROM memos', function(err, rows) {
    //  if (err) {
    //    throw err;
    //  }
    //  const memos = []
    //  const titles = []
    //  rows.forEach(function (row) {
    //    const body = row.body.split(',');
    //    const id = row.id;
    //    memos.push(body);
    //    titles.push({name: body[0], message: body[0], value: id});
    //  });
      //const prompt = new Select({
      //  name: 'memos',
      //  message: 'Choose a memo you want to read.',
      //  choices: titles,
      //  result() {
      //    return this.focused.value;
      //  }
      //});
      //prompt.run()
      //  .then(id => memos[id - 1].forEach(line => console.log(line)))
      //  .catch(console.error);
    //});
      }else if (process.argv[2] == '-d'){
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
            message: 'Choose a memo you want to delete.',
            choices: titles,
            result() {
              return this.focused.value;
            }
          });
      prompt.run()
        .then(id => db.run("DELETE FROM memos WHERE id = ?", id))
        .catch(console.error);
    });
      }
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
