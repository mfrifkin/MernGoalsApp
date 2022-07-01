const mongoose = require('mongoose')


const connectDB = async ()=>{
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI)
        console.log(`db connected at ${conn.connection.host}`.cyan.underline)
    } catch (error) {
        // 1 means failure
        console.log('db connection failed')
        console.log(error)
        process.exit(1)
         
    }
}

module.exports = {
    connectDB
}