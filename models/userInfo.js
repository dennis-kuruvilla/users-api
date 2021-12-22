const mongoose = require('mongoose')


const userInfoSchema = new mongoose.Schema({
  userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      },
  userGroupId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UserGroups'
      },
  lastLoggedIn: {
    type: Date,
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
  }
})


userInfoSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    returnedObject.User = returnedObject.userId
    returnedObject.UserGroup = returnedObject.userGroupId
    delete returnedObject._id
    delete returnedObject.__v
    delete returnedObject.userId
    delete returnedObject.userGroupId
  }
})

module.exports = mongoose.model('UserInfo', userInfoSchema)