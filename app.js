const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
//
const { log } = console; /* destructure logging */
// <====>
const app = express();

app.set("view engine", "ejs"); /* set ejs as View engine */
app.use(bodyParser.urlencoded({ extended: true })); /* use bodyparser */
app.use(express.static("public")); /* set middle-ware */

// <====>
//! CONNECTION TO DATABASE STARTS
mongoose
  .connect("mongodb://127.0.0.1:27017/wikiDB")
  .then(function () {
    log("Connection Secured!");
  })
  .catch(function () {
    log("Something Went wrong!");
  });

// CREATE COLLECTION SCHEMA
const articleSchema = new mongoose.Schema({
  title: String,
  content: String,
});

// CREATE SCHEMA MODEL
const Article = mongoose.model("Article", articleSchema);
//! CONNECTION TO DATABASE ENDS

//Handle ROutes to /articles using chainable route
app
  .route("/articles")

  //Get Mothod
  .get(function (req, res) {
    Article.find()
      .then(function (data) {
        res.send(data);
      })
      .catch(function (err) {
        res.send(err);
      });
  })

  //Post Method
  .post(function (req, res) {
    const requestedDataTitle = req.body.title;
    const requestedDataContent = req.body.content;

    const newArticle = new Article({
      title: requestedDataTitle,
      content: requestedDataContent,
    });
    newArticle.save().then(function () {
      log("Article Saved!");
      res.redirect("/articles");
    });
  })

  // Delete Method
  .delete(function (req, res) {
    Article.deleteMany().then(() => {
      log("Many deleted");
      res.send("All Articles deleted");
    });
  });

app
  .route("/articles/:id")

  //get
  .get(function (req, res) {
    const ID = req.params.id; /* get params value */

    Article.findOne({ title: ID })
      .then(function (data) {
        if (!data) {
          res.send("There is no article with that title!");
        } else {
          res.send(data);
        }
      })
      .catch(function (err) {
        res.send(err);
      });
  })

  //put - overwrite the whole document
  .put(function (req, res) {
    Article.updateOne(
      { title: req.params.id },
      { title: req.body.title, content: req.body.content },
      { upsert: true }
    ).then(function () {
      res.send("Update was Successful");
    });
  })

  //patch
  .patch(function (req, res) {
    Article.updateOne(
      { title: req.params.id },
      { $set: { title: req.body.title, content: req.body.content } }
    ).then(function () {
      res.send("Doc updated Successfully");
    });
  })

  //delete
  .delete(function (req, res) {
    Article.deleteMany({ title: req.params.id }).then(function () {
      res.send("Doc Deleted");
    });
  });

// <====>
const PORT = 3000;
app.listen(PORT, function () {
  log("Server Up and Running, Happy Coding Stroge!");
});
