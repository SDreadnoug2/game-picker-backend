
  module.exports = (err, req, res, next) => {
    console.error(err);
    const statusCode = err.statusCode || 500;
    const message = statusCode === 500 ? 'An Error Occured on the Server' : error.message;
    res.status(statusCode).send({message});
    next();
  }