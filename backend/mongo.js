require('dotenv').config()
const mongoose = require('mongoose')

if (process.argv.length < 3) {
    console.log('need one argument (add|get)')
    process.exit(1)
}

const product = require('.models/product')

const url = process.env.MONGODB_URI

mongoose.connect(url)

const Product = mongoose.model('Product', productSchema)

if (process.argv[2].toLowerCase() === 'add') {

    const product = new Product({
        name: "Marimekon paita :)", // Official product name
        age: "5", // Age in years
        picture: "<url-to-picture>", // url to picture
        condition: "good" // Condition good | bad | ugly
    })

    product.save().then(response => {
        console.log(`added ${toString(product)} to the db`)
        mongoose.connection.close()
    })
}
else if (process.argv[2].toLowerCase() === 'get') {
    // if process length is 1 (2+1=3) it is expected that user only gave the
    // password and the program will fetch current information stored to the database
    console.log(`products:`)
    Product.find({}).then(product => {
        product.forEach(product => {
          console.log(`${product.name} ${product.id} ${product.age}`)
        })
        mongoose.connection.close()
      })
}
else {
    // Other arv length not supported.
    console.log('unsupported argument')
    process.exit(1)
}
