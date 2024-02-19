const error = (req, res, next) => {
    const error = new Error('The requested resource could\'t be found');
    error.statusCode = 404;
    next(error);
}

// errorMiddleware.js
const errorMiddleware = (err, req, res, next) => {
    console.error(err.stack);
    const statusCode = err.statusCode || 500; // Default to 500 (Internal Server Error)
    const message = err.message || 'Internal Server Error';

    res.status(statusCode).json({
        error: {
            message,
            statusCode
        }
    });
};

module.exports = { error, errorMiddleware };
