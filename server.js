const express = require("express");
const dataController = require("./controllers/data");
const mongoConnect = require("./utils/connectdb").mongoconnect;
const app = express();

const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});
app.get("/data", dataController.getData);
app.post("/add", dataController.addData);
app.delete("/delete/:id", dataController.deleteData);
app.put("/edit", dataController.editData);
const port = process.env.PORT || 5000;
mongoConnect(() => {
  app.listen(port);
});
