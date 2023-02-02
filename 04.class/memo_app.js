import {Memo} from './memo.js'
import * as readline from "readline";
const reader = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

 let lines = [];
 reader.on('line', (line) => {
    lines.push(line);
    const memo = new Memo(lines);
    console.log(memo.lines)
 });
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
