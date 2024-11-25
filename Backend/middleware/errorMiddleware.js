const notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(400);
  next(error);
};

const errorHandler = (err, req, res, next) => {
  let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  let message = err.message;

  //check for mongoose bad objectId
  if (err.name === "castError" && err.kind === "objectId") {
    message = `Resource not found`;
    statusCode = 400;
  }
  res.status(statusCode).json({
    message,
    stack: process.env.NODE_ENV === "production" ? "Cake" : err.stack,
  });
};

export { notFound, errorHandler };
