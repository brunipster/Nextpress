
module.exports = class Task {
    constructor(id,name, date, state) {
      this.id = id;
      this.name = name;
      this.date = date;
      this.state = state;
    }
}