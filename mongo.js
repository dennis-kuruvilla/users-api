const mongoose = require('mongoose')
const UserGroups = require('./models/UserGroups')
const User = require('./models/User')
const UserInfo = require('./models/userInfo')
require('dotenv').config();

const url = process.env.MONGODB_URI

mongoose.connect(url)

// UserInfo.find({}).populate(['userId','userGroupId'])
// .then(res=>console.log(res))



//61c3611906f9e36558281194 admin
//61c35c034c9633b7ca2d891a superAdmin
//61c361265225a779bdc56c6f fan



const user = new User({
    firstName: "Leonardo",
    lastName: "Decaprio",
    createdAt: new Date()
})

console.log("user id:",user.id)

user.save()
.then(result=>{console.log("success",result)

const userInfo = new UserInfo({
    userId: result._id.toString(),
    userGroupId: "61c36130850050e0b3c1014a",
    lastLoggedIn: new Date(),
    createdAt: new Date()
})

console.log("userinfo id:",userInfo.id)

 return userInfo.save()})
.then(result=> console.log("success",result))
.then(()=>process.exit())






// const noteSchema = new mongoose.Schema({
//   content: String,
//   date: Date,
//   important: Boolean,
// })

// const Note = mongoose.model('Note', noteSchema)

// const ug = new UserGroups({
//   name: 'creator',
//   createdAt: new Date(),
// })

// ug.save()
// .then(res => console.log(res))

//Select all the docs in a collection
// Note.find({}).then(result => {
//     result.forEach(note => {
//       console.log(note)
//     })
//     mongoose.connection.close()
//   })

// note.save().then(result => {
//   console.log('note saved!')
//   mongoose.connection.close()
// })

