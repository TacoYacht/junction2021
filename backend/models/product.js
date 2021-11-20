const mongoose = require('mongoose')
const Schema = mongoose.Schema
const url = process.env.MONGODB_URI

console.log('connecting to', url)

mongoose.connect(url)
  .then(result => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })

const productSchema = new mongoose.Schema({
    model: {
      type: Schema.Types.ObjectId,
      ref: 'ProductModel'
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    status: String,
    age: String,
    picture: [],
    condition: String,
    date: Date,
    size: String
})

productSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Product', productSchema)