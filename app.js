const express = require("express");
// const bodyParser = require("body-parser");

// set up body parser
// const urlencodedparser = bodyParser.urlencoded({ extended: false });

// set app
const app = express();
// app.use(express.bodyParser({ extended: true }));
app.use(express.static("public"));





//listen to server
app.listen(3000, function () {
  console.log("Server is running on port 3000!");
});
