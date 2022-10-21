module.exports = (sequelize, Sequelize) => {
    const Blog = sequelize.define("blog", {
      title: {
        type: Sequelize.STRING
      },
      post: {
        type: Sequelize.STRING
      },
      tag: {
        type: Sequelize.STRING
      },
      author: {
        type: Sequelize.STRING
      },
      published: {
        type: Sequelize.BOOLEAN
      }

    });
  
    return Blog;
  };