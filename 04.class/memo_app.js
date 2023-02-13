const Memo = require('./memo.js');
const readline = require('node:readline/promises');
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('memo_app');
const { Confirm } = require('enquirer');
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
      })
    });
  }else if (process.argv[2] == '-r'){
    const prompt = new Confirm({
      name: 'question',
      message: 'Did you like enquirer?'
    });
     
    prompt.run()
      .then(answer => console.log('Answer:', answer));
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
