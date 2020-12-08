const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const httpHandler = require('../helpers/httpHandler');
const slackHandler = require('../helpers/slackHandler');
const verifyToken = require('../helpers/auth').verifyToken;
var Article = require('../dal/models/articleModel');
var User = require('../dal/models/userModel');

const articlesApi = express();
articlesApi.use(cors());
articlesApi.use(bodyParser.json());

articlesApi.post('/articles/create', verifyToken, (req, res) => {
  var article = new Article({
    user: req.body.user,
    title: req.body.title,
    text: req.body.text,
    tags: req.body.tags
  });

  return article.save((err, savedArticle) => {
    if (err) {
      return httpHandler.handleError(err, res, 400);
    }
    return User.findById(savedArticle.user).exec(
      (err, user) => {
        if (err) {
          return httpHandler.handleError(err, res, 400);
        }
        slackHandler.write(user.name, savedArticle.title);
        return httpHandler.handleSuccess(savedArticle, res, 201);
      });
  });
});


articlesApi.put('/articles/:id', verifyToken, (req, res) => {
  var id = req.params.id;
  var body = req.body;

  Article.findById(id, (err, article) => {
    if (err) {
      return httpHandler.handleError(err, res, 500);
    }
    if (!article) {
      return httpHandler.handleError(`Article with id: ${id} doesn't exist.`, res, 400);
    }

    article.title = body.title.trim();
    article.text = body.text.trim();
    article.tags = body.tags;

    article.save((err, savedArticle) => {
      if (err) {
        return httpHandler.handleError(err, res, 400);
      }
      return httpHandler.handleSuccess(savedArticle, res, 200);

    });
  });
});

articlesApi.delete('/articles/:id', verifyToken, (req, res) => {
  var id = req.params.id;

  Article.findByIdAndDelete(id, (err, article) => {
    if (err) {
      return httpHandler.handleError(err, res, 500);
    }

    if (!article) {
      return httpHandler.handleError(`Article with id: ${id} doesn't exist.`, res, 400);
    }

    return httpHandler.handleSuccess("", res, 200);

  });
});


articlesApi.post('/articles/', verifyToken, (req, res) => {
  var tags = req.body.tags;

  Article.find({ tags: { "$in": tags } }).populate({
    path: 'user',
    select: 'name'
  }).exec(
    (err, article) => {
      if (err) {
        return httpHandler.handleError(err, res, 400);
      }
      return httpHandler.handleSuccess(article, res, 200);
    });;
});

module.exports = {
  articlesApi
}