const db = require("../models");
const Blog = db.blog;
const Op = db.Sequelize.Op;


// Create and Save a new Blog
exports.create = (req, res) => {
  // Validate request
  if (!req.body.title) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a Blog
  const blog = {
    title: req.body.title,
    post: req.body.post,
    tag: req.body.tag,
    author: req.body.author,
    published: req.body.published ? req.body.published : false
  };

  // Save Blog in the database
  Blog.create(blog)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Blog."
      });
    });
};

// Retrieve all Blog by tag from the database.
exports.findAllByTag = (req, res) => {
  Blog.findAll({ where: { tag: req.params.tag } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving blog."
      });
    });
};


// Retrieve all Blog from the database.
exports.findAll = (req, res) => {
  const title = req.query.title;
  var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

  Blog.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving blog."
      });
    });
};

// Find a single Blog with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Blog.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Blog with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Blog with id=" + id
      });
    });
};




// Update a Blog by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Blog.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Blog was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Blog with id=${id}. Maybe Blog was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Blog with id=" + id
      });
    });
};

// Delete a Blog with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Blog.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Blog was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Blog with id=${id}. Maybe Blog was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Blog with id=" + id
      });
    });
};

// Delete all Blog from the database.
exports.deleteAll = (req, res) => {
  Blog.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Blog were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all blog."
      });
    });
};

// find all published Blog
exports.findAllPublished = (req, res) => {
  Blog.findAll({ where: { published: true } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving blog."
      });
    });
};