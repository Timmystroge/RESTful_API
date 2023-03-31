const runBlog = function (app) {
  // home route
  app.get("/", (req, res) => {
    res.render("home");
  });

  // about route
  app.get("/about", (req, res) => {
    res.render("about");
  });

  // contact route
  app.get("/contact", (req, res) => {
    res.render("contact");
  });

  // compose route
  app.get("/compose", (req, res) => {
    res.render("compose");
  });

  //   post route
  app.get("/post", (req, res) => {
    res.render("post");
  });

  //   404 page
  app.get("/*", (req, res) => {
    res.render("404");
  });
};

module.exports = runBlog;
