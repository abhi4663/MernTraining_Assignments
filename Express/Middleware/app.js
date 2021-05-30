const express = require("express");
const app = express();


const { sup, how } = require("./middle");

app.use(sup);

app.listen(3000, err => {
  if (err) {
    console.log(err);
    return;
  }
  console.log("listening on port 3000");
});