const { authJwt } = require("../middleware");
const controller = require("../controllers/user.controller");
const file = require("../controllers/file.controller");
var router = require("express").Router();
const blog = require("../controllers/blog.controller.js");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/juwanji/test/all", controller.allAccess);

  app.get(
    "/juwanji/test/user",
    [authJwt.verifyToken],
    controller.userBoard
  );

  app.get(
    "/juwanji/test/mod",
    [authJwt.verifyToken, authJwt.isModerator],
    controller.moderatorBoard
  );

  app.get(
    "/juwanji/test/admin",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.adminBoard
  );

  //uploading
  app.post(
    "/juwanji/upload",
    file.upload
  );

  app.get(
    "/juwanji/files",
    file.getListFiles
  );
  app.get(
    "/juwanji/files/:name",
    file.download
  );

  app.delete(
    "/juwanji/files/:name",
    file.remove
  );


  //blog posting

  // Create a new blog
  app.post(
    "/juwanji/blog",
    [authJwt.verifyToken, authJwt.isAdmin],
    blog.create
  );

  // Retrieve all blogs
  app.get(
    "/juwanji/blog",
    blog.findAll
  );

  // Retrieve all published blogs
  app.get(
    "/juwanji/blog/published",
    blog.findAllPublished
  );

    // Retrieve all published blogs
    app.get(
      "/juwanji/blog/tags/:tag",
      blog.findAllByTag
    );

  // Retrieve a single blog with id
  app.get(
    "/juwanji/blog/:id",
    blog.findOne
  );

  // Update a blog with id
  app.put(
    "/juwanji/blog/:id",
    [authJwt.verifyToken, authJwt.isAdmin],
    blog.update
  );

  // Delete a blog with id
  app.delete(
    "/juwanji/blog/:id",
    [authJwt.verifyToken, authJwt.isAdmin],
    blog.delete
  );

  // Delete all blogs
  app.delete(
    "/juwanji/blog",
    [authJwt.verifyToken, authJwt.isAdmin],
    blog.deleteAll
  )

};
