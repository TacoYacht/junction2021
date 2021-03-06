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

const itemSchema = new mongoose.Schema({
    product: {
      type: Schema.Types.ObjectId,
      ref: 'Product'
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    forSale: Boolean,
    forSwap: Boolean,
    age: String,
    picture: [],
    condition: String,
    created: Date,
    size: String,
    price: Number
})

itemSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Item', itemSchema)