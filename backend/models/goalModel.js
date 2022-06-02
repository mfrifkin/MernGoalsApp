const mongoose = require('mongoose')

// the schema defines the fields that each object will have
const goalSchema = mongoose.Schema({

    text:{
        type: String,
        require: [true,'Please add text']
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
module.exports = mongoose.model('Goal',goalSchema)