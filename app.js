const bodyParser = require("body-parser");
const express = require("express");
const blogControllers = require("./controllers/blogController");

const app = express();
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: false }));

blogControllers(app);

app.listen(3000, () => {
  console.log("Server Started On Port 3000");
});
