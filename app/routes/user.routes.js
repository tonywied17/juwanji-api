const { authJwt } = require("../middleware");
const controller = require("../controllers/user.controller");
const file = require("../controllers/file.controller");
const blog = require("../controllers/blog.controller.js");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/test/all", controller.allAccess);

  app.get(
    "/api/test/user",
    [authJwt.verifyToken],
    controller.userBoard
  );

  app.get(
    "/api/test/mod",
    [authJwt.verifyToken, authJwt.isModerator],
    controller.moderatorBoard
  );

  app.get(
    "/api/test/admin",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.adminBoard
  );

  //uploading
  app.post(
    "/upload",
    file.upload
  );

  app.get(
    "/files",
    file.getListFiles
  );
  app.get(
    "/files/:name",
    file.download
  );

  app.delete(
    "/files/:name",
    file.remove
  );


  //blog posting

  // Create a new blog
  app.post(
    "/blog",
    [authJwt.verifyToken, authJwt.isAdmin],
    blog.create
  );

  // Retrieve all blogs
  app.get(
    "/blog",
    blog.findAll
  );

  // Retrieve all published blogs
  app.get(
    "/blog/published",
    blog.findAllPublished
  );

    // Retrieve all published blogs
    app.get(
      "/blog/tags/:tag",
      blog.findAllByTag
    );

  // Retrieve a single blog with id
  app.get(
    "/blog/:id",
    blog.findOne
  );

  // Update a blog with id
  app.put(
    "/blog/:id",
    [authJwt.verifyToken, authJwt.isAdmin],
    blog.update
  );

  // Delete a blog with id
  app.delete(
    "/blog/:id",
    [authJwt.verifyToken, authJwt.isAdmin],
    blog.delete
  );

  // Delete all blogs
  app.delete(
    "/blog",
    [authJwt.verifyToken, authJwt.isAdmin],
    blog.deleteAll
  )




};
