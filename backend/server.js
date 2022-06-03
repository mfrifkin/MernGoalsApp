const express = require('express')
const dotenv = require('dotenv').config()
const port = process.env.PORT || 5000
const {errorHandler} = require('./middleware/errorMiddleware.js')
const {connectDB} = require('./config/db.js')
const colors = require('colors')

connectDB();

const app = express()

// extra middleware that allows server to decode json and urlencoded
// stuff in the body
app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.listen(port, ()=>console.log(`server running on ${port}`))

// this line matches a request to /api/goals and send it to 
// the file specified in the require to be handled
// the require() is a node function that goes to that path
// executes that file and returns whatever is specified to be exported
// from that file, the second param is a callback function
app.use('/api/goals', require('./routes/goalRoutes'));
app.use('/api/users', require('./routes/userRoutes'));

//use the errorhandler that we wrote in the middleware folder instead of
// expresses default error handler
app.use(errorHandler);   
