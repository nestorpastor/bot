let handleError = (err, res, statusCode) => {
  res.status(statusCode || 500).json({
    'message': err.message || 'error',
    error: err
  });
};

let handleSuccess = (data, res, statusCode) => {
  res.status(statusCode || 200).json({
    message: 'success',
    data: data
  });
};

module.exports = {
  handleError,
  handleSuccess
}