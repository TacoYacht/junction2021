const mongoose = require('mongoose')
const Schema = mongoose.Schema

const productSchema = new mongoose.Schema({
    name: String,
    category: {
      type: Schema.Types.ObjectId,
      ref: 'Category'
    },
    pattern: {
      type: Schema.Types.ObjectId,
      ref: 'Pattern'
    },
    originalPrice: Number,
    image: String,
    availableColors: [String],

})

productSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
    }
})

module.exports = mongoose.model('Product', productSchema)
