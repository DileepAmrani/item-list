const Data = require("../model/data");
exports.getData = (req, res) => {
  Data.fetchAll().then((result) => {
    res.json(result);
  });
};
exports.addData = (req, res) => {
  const title = req.body.title;
  const add = new Data(title);
  add.save().then((result) => {
    res.send("sucess");
  });
};
exports.deleteData = (req, res) => {
  Data.delete(req.params.id).then((result) => {
    res.send("deleted with sucess");
  });
};
exports.editData = (req, res) => {
  const _id = req.body._id;
  const title = req.body.title;
  Data.edit(_id, title).then((result) => {
    res.send("edited with sucess");
  });
};
