const mongoose = require('mongoose')

const productModelSchema = new mongoose.Schema({
    name: String,
})

productModelSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
    }
})

module.exports = mongoose.model('ProductModel', productModelSchema)
