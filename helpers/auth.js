const httpHandler = require('./httpHandler');
exports.verifyToken = function (req, res, next) {
  var token = req.headers.authorization;
  if (token === process.env.TOKEN) {
    next();
  }
  else {
    return httpHandler.handleError('Invalid Token.', res, 401);
  }
}