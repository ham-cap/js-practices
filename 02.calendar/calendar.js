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
const SPACES_OF_THE_HEAD = { 1: 5, 2: 8, 3: 11, 4: 14, 5: 17, 6: 20, 7: 2 };
console.log(`      ${date.month}月 ${date.year}`);
console.log("日 月 火 水 木 金 土");
for (let i = 0; i < daysOfOneMonthString.length; i++) {
  if (i === 0) {
    process.stdout.write(
      String(
        daysOfOneMonthString[i].padStart(SPACES_OF_THE_HEAD[firstDay.weekday])
      )
    );
  } else if (daysOfOneMonth[i].weekday === 6) {
    process.stdout.write(" ");
    process.stdout.write(String(daysOfOneMonthString[i]));
    process.stdout.write(String("\n"));
  } else if (daysOfOneMonth[i].weekday === 7) {
    process.stdout.write(String(daysOfOneMonthString[i]));
  } else {
    process.stdout.write(" ");
    process.stdout.write(String(daysOfOneMonthString[i]));
  }
}
