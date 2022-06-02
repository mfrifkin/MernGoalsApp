const mongoose = require('mongoose')


const connectDB = async ()=>{
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI)
       // console.log(`mongo db connected${conn.connection.host}`.cyan.underline)
       console.log(`db connected at ${conn.connection.host}`.cyan.underline)
    } catch (error) {
        // 1 means failure
        process.exit(1)
        
    }
}

module.exports = {
    connectDB
}