module.exports = class Memo {
  constructor(id, body) {
    this.id = id;
    this.body = body;
  }

  static createChoices(memos) {
    const choices = [];
    memos.forEach(function (memo) {
      choices.push({
        name: memo.body[0],
        message: memo.body[0],
        value: memo.id,
      });
    });
    return choices;
  }
};
