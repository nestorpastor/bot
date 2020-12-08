const serverless = require('serverless-http');
const db = require('./dal/dbConnection');
const articlesApi = require('./routes/articles').articlesApi;
const usersApi = require('./routes/users').usersApi;

module.exports.articles = serverless(articlesApi, db);
module.exports.users = serverless(usersApi, db);