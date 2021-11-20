require('dotenv').config()
const mongoose = require('mongoose')
const fs = require('fs')

if (process.argv.length < 3) {
    console.log('need one argument (add|get)')
    process.exit(1)
}

const Product = require('./models/product')
const Item = require('./models/item')
const User = require('./models/user')

const url = process.env.MONGODB_URI

mongoose.connect(url)

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
else if (process.argv[2].toLowerCase() === 'get_productmodels') {
    // if process length is 1 (2+1=3) it is expected that user only gave the
    // password and the program will fetch current information stored to the database
    console.log(`product models:`)
    ProductModel.find({}).then(productModel => {
        productModel.forEach(product => {
          console.log(`Name:${productModel.name}`)
        })
        mongoose.connection.close()
    })
}
else if (process.argv[2].toLowerCase() === 'get_users') {
    console.log(`users:`)
    User.find({}).then(user => {
        user.forEach(product => {
            console.log(`Name:${user.name}`)
        })
        mongoose.connection.close()
    })
}
else if (process.argv[2].toLowerCase() === 'get_products') {
    
    console.log(`products:`)
    Product.find({}).then(product => {
        product.forEach(product => {
            console.log(`Name:${product.name} Owner:${product.id} Age:${product.age} `)
        })
        mongoose.connection.close()
    })
}
else if (process.argv[2].toLowerCase() === 'load_products') {
    // Read product models from json
    fs.readFile('./example_data/products.json', 'utf8', (err, jsonString) => {
        if (err) {
            console.log("File read failed:", err)
            return
        }
        console.log('File data:', jsonString) 
        try {
            const json = JSON.parse(jsonString)
            json.forEach(
                p => {
                    console.log(`${p.name}`)
                    // Add json entry to database
                    if (True) { // TBD: add checks here
                        return response.status(400).json({ error: 'required content missing (either model, owner, age, condition or size)' })
                      }

                      const product = new Product({
                          // TBD: add fields here
                      })
                    
                      product.save().then(savedProduct => {
                        response.json(savedProduct)
                      })
                }
            )

        } catch(err) {
            console.log('Error parsing JSON string:', err)
        }
    })
    mongoose.connection.close()
}
else if (process.argv[2].toLowerCase() === 'load_item') {
    // Read product models from json
    fs.readFile('./example_data/items.json', 'utf8', (err, jsonString) => {
        if (err) {
            console.log("File read failed:", err)
            return
        }
        console.log('File data:', jsonString) 
        try {
            const json = JSON.parse(jsonString)
            json.forEach(
                p => {
                    console.log(`${p.name}`)
                    // Add json entry to database
                    if (True) { // TBD: Add checks here
                        return response.status(400).json({ error: 'required content missing (either model, owner, age, condition or size)' })
                      }
                      const item = new Item({
                          // TBD: add fields here
                      })
                      item.save().then(savedItem => {
                        response.json(savedItem)
                      })
                }
            )

        } catch(err) {
            console.log('Error parsing JSON string:', err)
        }
    })
    mongoose.connection.close()
}
else if (process.argv[2].toLowerCase() === 'load_categories') {
    // Read product models from json
    fs.readFile('./example_data/category.json', 'utf8', (err, jsonString) => {
        if (err) {
            console.log("File read failed:", err)
            return
        }
        console.log('File data:', jsonString) 
        try {
            const json = JSON.parse(jsonString)
            json.forEach(
                p => {
                    console.log(`${p.name}`)
                    // Add json entry to database
                    if (True) { // TBD: Add checks here
                        return response.status(400).json({ error: 'required content missing (either model, owner, age, condition or size)' })
                      }
                      const category1 = new Category({
                          // TBD: add parsing
                      })
                      category.save().then(savedCategory => {
                        response.json(savedCategory)
                        
                      })
                }
            )
        } catch(err) {
            console.log('Error parsing JSON string:', err)
        }
    })
    mongoose.connection.close()
}
else if (process.argv[2].toLowerCase() === 'load_items') {
    // Read product models from json
    fs.readFile('./example_data/items.json', 'utf8', (err, jsonString) => {
        if (err) {
            console.log("File read failed:", err)
            return
        }
        console.log('File data:', jsonString) 
        try {
            const json = JSON.parse(jsonString)
            json.forEach(
                p => {
                    console.log(`${p.name}`)
                    // Add json entry to database
                    if (True) { // TBD: Add checks here
                        return response.status(400).json({ error: 'required content missing (either model, owner, age, condition or size)' })
                      }
                      const user = new User({
                          // TBD: add fields here
                      })
                      user.save().then(savedUser => {
                        response.json(savedUser)
                      })
                }
            )

        } catch(err) {
            console.log('Error parsing JSON string:', err)
        }
    })
    mongoose.connection.close()
}
else {
    // Other arv length not supported.
    console.log('unsupported argument')
    process.exit(1)
}
