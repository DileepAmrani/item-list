const mongodb = require("mongodb");
const constant = require("../config/constant");
const url = constant.URI;
const MongoClient = mongodb.MongoClient;
let _db;
const mongoconnect = (callback) => {
  MongoClient.connect(url)
    .then((result) => {
      _db = result.db("todo");
      console.log("connected");
      callback();
    })
    .catch((err) => console.log(err));
};
const getDb = () => {
  if (_db) {
    return _db;
  }
  throw "no data base ";
};
exports.mongoconnect = mongoconnect;
exports.getDb = getDb;
