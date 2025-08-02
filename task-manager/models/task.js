const mongoose = require('mongoose')

const taskSchema = mongoose.Schema({
  text: String,
  done: Boolean,
  description: String,
  dueDate: Date,
  priority: String,
  user:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
})

taskSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Task',taskSchema)