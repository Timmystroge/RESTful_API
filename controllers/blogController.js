const _ = require("lodash");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const { log } = console; /* Destructure console.log */

// initialize .env
dotenv.config()
// connect to database
mongoose
  .connect(process.env.BACKEND_API)
  .then(() => {
    log("Connected to database successfully");
  })
  .catch(() => {
    log("Cannot Connect to Database");
  });

//  Create Blog Post Schema
const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: [true, "Author is required!"],
  },
});

// create blog model
const BlogPost = mongoose.model("BlogPost", blogSchema);

const runBlog = function (app) {
  // home route
  app.get("/", (req, res) => {
    // fetch data from database
    BlogPost.find()
      .then((data) => {
        res.render("home", { posts: data });
      })
      .catch((err) => {
        log(err);
      });
  });

  // about route
  app.get("/about", (req, res) => {
    res.render("about");
  });

  // contact route
  app.get("/contact", (req, res) => {
    res.render("contact");
  });

  // compose route == GET
  app.get("/compose", (req, res) => {
    res.render("compose");
  });

  // compose route == POST
  app.post("/compose", (req, res) => {
    // get value of new post inputs from frontend using parser
    const title = _.lowerCase(req.body.title);
    const content = req.body.content;

    // insert new post details to database
    const createNewPost = new BlogPost({
      title: title,
      content: content,
      author: process.env.BLOG_AUTHOR,
    });
    /* Save data to database */
    createNewPost.save();

    // Redirection
    res.redirect("/");
  });

  app.get("/posts/:postId", function (req, res) {
    // convert requested id to lowercase
    const requestedID = _.lowerCase(req.params.postId); /* title */

    BlogPost.find()
      .then((data) => {
        data.forEach((post) => {
          const postTitleFromDb = post.title;

          if (postTitleFromDb === requestedID) {
            const postDetails = {
              title: post.title,
              content: post.content,
            };
            res.render("post", { requestedPost: postDetails });
          }
        });
      })
      .catch((err) => {
        log(err);
      });
  });

  //   404 page
  app.get("/*", (req, res) => {
    res.render("404");
  });
};

module.exports = runBlog;
