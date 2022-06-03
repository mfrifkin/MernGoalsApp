const mongoose = require('mongoose')

// the schema defines the fields that each object will have
const userSchema = mongoose.Schema({

    name:{
        type: String,
        require: [true,'Please add text']
    },
    email:{
        type: String,
        require: [true,'Please add email'],
        unique: true
    },
    password:{
        type: String,
        require: [true,'Please add password']
    }
},
{
    timestamps:true
})

// passing a schema into the model function creates kind of a class
// of db object with the name that you pass in (in this case its 'goal')
// and fields as defined in the schema, its kind of like writing
// a class for an object, in addition to the fields that we supply
// the model object has many useful built in mongoose methods
module.exports = mongoose.model('User',userSchema)