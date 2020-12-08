const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const httpHandler = require('../helpers/httpHandler');
var User = require('../dal/models/userModel');
const verifyToken = require('../helpers/auth').verifyToken;

const usersApi = express();
usersApi.use(cors());
usersApi.use(bodyParser.json());

usersApi.post('/users/create', verifyToken, (req, res) => {
  var user = new User({
    name: req.body.name,
    avatar: req.body.avatar
  });

  return user.save((err, savedUser) => {
    if (err) {
      return httpHandler.handleError(err, res, 400);
    }
    return httpHandler.handleSuccess(savedUser, res, 201);
  });
});

module.exports = {
  usersApi
}