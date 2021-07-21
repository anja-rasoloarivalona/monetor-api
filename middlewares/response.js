export default (req, res, next) => {
    res.success = (data, message, status) =>
        res.status(status).json({
            data,
            message,
        });
        
    res.error = (errors, message, status) =>
        res.status(status).json({
            errors,
            message
        });
    return next();
};