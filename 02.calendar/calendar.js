const argv = require("minimist")(process.argv);
const luxon = require("luxon");
const today = luxon.DateTime.now();
const month = argv.m || today.month;
const year = argv.y || today.year;
const date = luxon.DateTime.local(year, month);
const firstDay = date.startOf("month");
const finalDay = date.endOf("month");
const daysOfOneMonth = [];

for (let i = 1; i <= finalDay.day; i++) {
  daysOfOneMonth.push(luxon.DateTime.local(date.year, date.month, i));
}
const daysOfOneMonthString = [];
for (let i = 0; i < daysOfOneMonth.length; i++) {
  daysOfOneMonthString.push(String(daysOfOneMonth[i].day).padStart(2));
}
const SPACES_OF_THE_HEAD = { 1: 3, 2: 6, 3: 9, 4: 12, 5: 15, 6: 18, 7: 0 };
console.log(`      ${date.month}月 ${date.year}`);
console.log("日 月 火 水 木 金 土");
process.stdout.write(String(" ".repeat(SPACES_OF_THE_HEAD[firstDay.weekday])));

for (let i = 0; i < daysOfOneMonthString.length; i++) {
  if (daysOfOneMonth[i].weekday === 6) {
    process.stdout.write(String(daysOfOneMonthString[i]));
    process.stdout.write(String("\n"));
  } else {
    process.stdout.write(String(daysOfOneMonthString[i]));
    process.stdout.write(" ");
  }
}
