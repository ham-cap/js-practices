const argv = require("minimist")(process.argv);
const luxon = require("luxon");
const today = luxon.DateTime.now();
const month = argv.m || today.get("month");
const year = argv.y || today.get("year");
const date = luxon.DateTime.local(year, month);
const firstDay = date.startOf("month");
const finalDay = date.endOf("month");
const daysOfOneMonth = [];

for (let i = 1; i <= finalDay.get("day"); i++) {
  daysOfOneMonth.push(
    luxon.DateTime.local(date.get("year"), date.get("month"), i)
  );
}
const daysOfOneMonthString = [];
for (let i = 0; i < daysOfOneMonth.length; i++) {
  if (daysOfOneMonth[i].get("weekday") === 6 && i < 9) {
    daysOfOneMonthString.push(
      String(daysOfOneMonth[i].get("day")).padStart(3) + "\n"
    );
  } else if (daysOfOneMonth[i].get("weekday") === 6 && i >= 9) {
    daysOfOneMonthString.push(
      String(daysOfOneMonth[i].get("day")).padStart(3) + "\n"
    );
  } else if (
    i < 9 &&
    daysOfOneMonth[i].get("weekday") !== 6 &&
    daysOfOneMonth[i].get("weekday") !== 7
  ) {
    daysOfOneMonthString.push(String(daysOfOneMonth[i].get("day")).padStart(3));
  } else if (daysOfOneMonth[i].get("weekday") === 7) {
    daysOfOneMonthString.push(String(daysOfOneMonth[i].get("day")).padStart(2));
  } else {
    daysOfOneMonthString.push(String(daysOfOneMonth[i].get("day")).padStart(3));
  }
}
const SPACES_OF_THE_HEAD = { 1: 5, 2: 8, 3: 11, 4: 14, 5: 17, 6: 20, 7: 2 };
console.log(`      ${date.get("month")}月 ${date.get("year")}`);
console.log("日 月 火 水 木 金 土");
for (let i = 0; i <= daysOfOneMonthString.length; i++) {
  if (i === 0) {
    process.stdout.write(
      String(
        daysOfOneMonthString[i].padStart(
          SPACES_OF_THE_HEAD[firstDay.get("weekday")]
        )
      )
    );
  } else {
    process.stdout.write(String(daysOfOneMonthString[i]));
  }
}
