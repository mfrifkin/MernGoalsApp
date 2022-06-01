// middleware is functions that execute during request response cycle 
// passing in 'err' allows us to override the default express error handler
const errorHandler = (err, req, res, next) =>{

    // if controller supplied a status, we use that one, otherwise
    // throw a 500 (code for server error )
    const statusCode = res.statusCode ? res.statusCode : 500;
    res.status(statusCode)

    res.json({
        message: err.message,
        // do not show stack trace if we are in production mode
        stack: process.env.NODE_ENV === 'production' ? null : err.stack

    })

}

module.exports = {
    errorHandler
}