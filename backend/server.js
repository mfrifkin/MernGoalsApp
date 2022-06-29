const path = require('path');
const express = require('express')
const dotenv = require('dotenv').config()
const port = process.env.PORT || 5000
const {errorHandler} = require('./middleware/errorMiddleware.js')
const {connectDB} = require('./config/db.js')
const colors = require('colors')
var cors = require('cors')

connectDB();

const app = express()

// extra middleware that allows server to decode json and urlencoded
// stuff in the body
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(cors())



app.listen(port, ()=>console.log(`server running on ${port}`))

// this line matches a request to /api/goals and send it to 
// the file specified in the require to be handled
// the require() is a node function that goes to that path
// executes that file and returns whatever is specified to be exported
// from that file, its really just an import statement. So instead of this 
//syntax, we could've imported each router as variables in the top of this file and 
// used them 
app.use('/api/goals', require('./Routes/goalRoutes'));
app.use('/api/users', require('./Routes/userRoutes'));


// Serve frontend
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../frontend/build')));
  
    app.get('*', (req, res) =>
      res.sendFile(
        path.resolve(__dirname, '../', 'frontend', 'build', 'index.html')
      )
    );
  } else {
    app.get('/', (req, res) => res.send('Please set to production'));
  }

//use the errorhandler that we wrote in the middleware folder instead of
// expresses default error handler
app.use(errorHandler);   
