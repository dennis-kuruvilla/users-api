const express = require('express')
require('dotenv').config();
require('express-async-errors')
const cors = require('cors')
const mongoose = require('mongoose')
const UserGroups = require('./models/UserGroups')
const User = require('./models/User')
const UserInfo = require('./models/userInfo');
const { response } = require('express');
const {requestLogger,unknownEndpoint,errorHandler} = require('./utils/middleware')

console.log('connecting to', process.env.MONGODB_URI)

mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })

const app = express()
app.use(express.json())
app.use(cors())


const validateGroups = (body) =>{
    const availableGroups = ['admin','superAdmin','fan','creator']
    let groups=body.groups
    if(groups && Object.keys(groups).length !== 0) {
        for(let property in body.groups){
            if (availableGroups.includes(property) && groups[property].pageNumber && groups[property].perPage ) continue;
            else return false;           
        }
        return true
    }
    return false
}

app.use(requestLogger)

app.get('/', (req, res) => {
    UserInfo.find({}).populate(['userId','userGroupId'])
    .then(result=> res.json(result))

  })

app.post('/',async (req,res,next)=>{
    
    const body = req.body
    
    if(validateGroups(body)){

        let groups =body.groups
        let finalResp = {}
        for(let property in groups){
           
            let propertyId = await UserGroups.findOne({"name": property})
            propertyId=propertyId._id.toString()

            const pageNumber=groups[property].pageNumber
            const perPage = groups[property].perPage
            const totalCount = await UserInfo.countDocuments({userGroupId:propertyId})
            let result =  await UserInfo.find({userGroupId : propertyId}).populate(['userId','userGroupId']).limit(perPage).skip(perPage*(pageNumber-1))

            if(result.length==0) result = { message: `This page is empty. Last page is ${Math.ceil(totalCount/perPage)}` };
           
            const resp= {
                data: result,
                pagination: {
                    pageNumber,
                    perPage,
                    totalCount
                }
            }
            
            finalResp[property] = resp
        }
        res.json(finalResp)
    }

    else if(body.pageNumber && body.perPage) {

        const pageNumber=body.pageNumber
        const perPage = body.perPage
        const totalCount = await UserInfo.estimatedDocumentCount()
        const result =  await UserInfo.find({}).populate(['userId','userGroupId']).limit(perPage).skip(perPage*(pageNumber-1))
        if(result.length==0) res.status(400).send({ message: `This page is empty. Last page is ${Math.ceil(totalCount/perPage)}` });
        else {
            const resp= {
                data: result,
                pagination: {
                    pageNumber,
                    perPage,
                    totalCount
                }
            }
            res.json(resp);
        }
      

    }
    else res.status(400).send({ error: 'Invalid Request' });
})

app.use(unknownEndpoint)

app.use(errorHandler)

const PORT = process.env.PORT || 3002 
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
    })