const DbOperator = require('./db_operator.js');
const dbOperator = new DbOperator();
const ListProvider = require('./list_provider');
const ReferenceEnquirer = require('./reference_enquirer');
const DestroyEnquirer = require('./destroy_enquirer');

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
  dbOperator.create();
};
