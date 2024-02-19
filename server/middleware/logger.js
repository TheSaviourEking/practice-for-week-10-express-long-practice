const logger = (req, res, next) => {
    const { method, url } = req;
    console.log(`${method} ${url}`);

    res.on('finish', () => {
        console.log(res.statusCode)
    })

    next();
}

module.exports = logger;
