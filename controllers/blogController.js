const _ = require("lodash");
const blogPosts = [];

const runBlog = function (app) {
  // home route
  app.get("/", (req, res) => {
    res.render("home", { posts: blogPosts });
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
    const newPost = {
      title: req.body.title,
      content: req.body.content,
    };
    blogPosts.push(newPost);

    // Redirection
    res.redirect("/");
  });

  app.get("/post", (req, res) => {
    const postDetails = {
      title: "one",
      content: "two",
    };
    res.render("post", { requestedPost: postDetails });
  });

  app.get("/posts/:postId", function (req, res) {
    // convert requested id to lowercase
    const requestedID = _.lowerCase(req.params.postId); /* title */

    if (blogPosts.length > 0) {
      blogPosts.forEach(function (postTitle) {
        //convert Stored details to lowercse
        const storedTitle = _.lowerCase(postTitle.title);

        if (storedTitle === requestedID) {
          const postDetails = {
            title: postTitle.title,
            content: postTitle.content,
          };
          res.render("post", { requestedPost: postDetails });
        }
      });
    } else {
      res.redirect("/");
    }
  });

  //   404 page
  app.get("/*", (req, res) => {
    res.render("404");
  });
};

module.exports = runBlog;
