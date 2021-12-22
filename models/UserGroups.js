const mongoose = require('mongoose')


const userGroupsSchema = new mongoose.Schema({
  name: {
    type: String,
    enum : ['admin', 'superAdmin','fan','creator'], 
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
  }
})


userGroupsSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.userGroupName = returnedObject.name
    returnedObject.userGroupId = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
    delete returnedObject.createdAt
    delete returnedObject.name
  }
})

module.exports = mongoose.model('UserGroups', userGroupsSchema)