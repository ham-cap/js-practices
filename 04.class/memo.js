module.exports = class Memo {
  constructor(id, body) {
    this.id = id;
    this.body = body;
  }

  static collectTitles(memos) {
    const titles = [];
    memos.forEach(function (memo) {
      titles.push({
        name: memo.body[0],
        message: memo.body[0],
        value: memo.id,
      });
    });
    return titles;
  }
};
