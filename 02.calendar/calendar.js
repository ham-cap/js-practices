const DAY_OF_WEEK_STRING = "日 月 火 水 木 金 土";
const TODAY = new Date();
const FIRST_DAY = new Date(TODAY.getFullYear(), TODAY.getMonth(), 1);
const FINAL_DAY = new Date(TODAY.getFullYear(), TODAY.getMonth() + 1, 0);
const daysOfOneMonth = [];

for (let i = 1; i <= FINAL_DAY.getDate() + 1; i++) {
  daysOfOneMonth.push(new Date(TODAY.getFullYear(), TODAY.getMonth(), i));
}
const daysOfOneMonthString = [];
for (let i = 0; i < daysOfOneMonth.length; i++) {
  if (daysOfOneMonth[i].getDay() === 6) {
    daysOfOneMonthString.push(String(daysOfOneMonth[i].getDate()) + "\n");
  } else {
    daysOfOneMonthString.push(String(daysOfOneMonth[i].getDate()));
  }
}
for (let i = 0; i <= daysOfOneMonthString.length; i++) {
  process.stdout.write(String(daysOfOneMonthString[i]));
}
