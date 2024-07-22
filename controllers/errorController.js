module.exports = (err, req, res, next) => {
    const statusCode = err.status || 500;
    const status = err.status >= 400 && err.status < 500 ? "fail" : "error";
    res.status(statusCode).json({
        status,
        message: err.message,
    });
};
