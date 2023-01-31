import {Memo} from './memo.js'
import * as readline from "readline";
const reader = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});
let lines = [];
reader.on('line', (line) => {
    console.log(`Received line is : ${line}`);
    lines.push(line);
    const memo = new Memo(lines)
    console.log(memo.lines)
});

// reader.on('close', () => {
//   console.log(lines);
// })
