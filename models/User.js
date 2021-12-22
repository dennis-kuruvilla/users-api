const mongoose = require('mongoose')


const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    minlength: 1,
    maxlength: 25,
    required: true,
  },
  lastName: {
    type: String,
    minlength: 1,
    maxlength: 25,
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
  }
})


userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.UserId = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('User', userSchema)