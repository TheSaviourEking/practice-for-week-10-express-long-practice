const error = (req, res, next) => {
    // const error = new Error('The requested resource could\'t be found');
    const error = new Error('Something went wrong');
    error.statusCode = 404;
    next(error);
}

// errorMiddleware.js
const errorMiddleware = (err, req, res, next) => {
    // console.error(err.stack);
    const statusCode = err.statusCode || 500; // Default to 500 (Internal Server Error)
    const message = err.message || 'Internal Server Error';

    const errorResponse = {
        message,
        statusCode
    }

    if (process.env.NODE_ENV !== 'production') {
        errorResponse.stackTrace = err.stack;
    }

    res.status(statusCode)
        .json(errorResponse);
};

module.exports = { error, errorMiddleware };
