const mongoose = require('mongoose')
const Schema = mongoose.Schema

const patternSchema = new mongoose.Schema({
    name: String,
    designer: String,
    image: String
})

patternSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
    }
})

module.exports = mongoose.model('Pattern', patternSchema)
