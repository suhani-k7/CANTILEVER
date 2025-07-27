const mongoose = require('mongoose')
const blogSchema=mongoose.Schema({
    title: String,
    body: String,
    author: String,
    id: Number
})

blogSchema.set('toJson',{
    transform:(document,returnedObject) => {
        returnedObject.id=returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
    }
})

module.exports = mongoose.model('Blog',blogSchema)