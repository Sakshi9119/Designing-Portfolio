const mongoose = require("mongoose");

//Create db:
mongoose
  .connect("mongodb://localhost:27017/DynamicSite")
  .then(() => {
    console.log("Connection Successful...!");
  })
  .catch((e) => {
    console.log(e);
  });
