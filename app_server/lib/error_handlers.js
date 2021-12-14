const createError = require('http-errors');

module.exports.errorUnauthorized = (err, req, res, next) => {
    if (err.name === 'UnauthorizedError') {
        res.status(401)
            .json({"message": err.name + ": " + err.message});
    }
};

module.exports.errorForbidden = (err, req, res, next) => {
    if (err.name === 'UnauthorizedError') {
        res.status(403)
            .json({"message": err.name + ": " + err.message});
    }
};

module.exports.errorNotFound = (err, req, res, next) => {
    res.status(404);
    res.render('404');
};

module.exports.errorInternalServerError = (err, req, res, next) => {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    res.status(err.status || 500)
    res.render('500')
};
