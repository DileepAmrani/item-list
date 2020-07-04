const getdB = require("../utils/connectdb").getDb;
const mongodb = require("mongodb");

module.exports = class Data {
  constructor(title) {
    this.title = title;
  }
  save() {
    const db = getdB();
    return db.collection("todo").insertOne(this);
  }
  static fetchAll() {
    const db = getdB();
    return db.collection("todo").find().toArray().then();
  }
  static delete(_id) {
    const db = getdB();
    return db.collection("todo").deleteOne({ _id: new mongodb.ObjectId(_id) });
  }
  static edit(_id, title) {
    const db = getdB();
    return db
      .collection("todo")
      .updateOne(
        { _id: new mongodb.ObjectId(_id) },
        { $set: { title: title } }
      );
  }
};
