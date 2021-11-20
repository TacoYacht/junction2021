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
const Category = require('./models/category')
const Pattern = require('./models/pattern')
const Wish = require('./models/wish')

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
        user.forEach(u => {
            console.log(`Name:${u.name}`)
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
else if (process.argv[2].toLowerCase() === 'load_patterns') {
    // Read product models from json
    fs.readFile('./example_data/patterns.json', 'utf8', async (err, jsonString) => {
        if (err) {
            console.log("File read failed:", err)
            return
        }
        console.log('File data:', jsonString)
        try {
            const json = JSON.parse(jsonString)
            for (const p of json) {
                const pattern = new Pattern({
                    name: p.name,
                    designer: p.designer,
                    image: p.image
                })
                await pattern.save()
            }
            mongoose.connection.close()
        } catch (err) {
            console.log('Error parsing JSON string:', err)
        }
    })
}
else if (process.argv[2].toLowerCase() === 'load_products') {
    // Read product models from json
    fs.readFile('./example_data/products.json', 'utf8', async (err, jsonString) => {
        if (err) {
            console.log("File read failed:", err)
            return
        }
        console.log('File data:', jsonString)
        try {
            const json = JSON.parse(jsonString)
            for (const p of json) {
                const product = new Product({
                    name: p.name,
                    category: await Category.findOne({ name: p.category }),
                    pattern: await Pattern.findOne({ name: p.pattern }),
                })
                await product.save()
            }
            mongoose.connection.close()
        } catch (err) {
            console.log('Error parsing JSON string:', err)
        }
    })
}
else if (process.argv[2].toLowerCase() === 'load_categories') {
    // Read product models from json
    fs.readFile('./example_data/categories.json', 'utf8', async (err, jsonString) => {
        if (err) {
            console.log("File read failed:", err)
            return
        }
        console.log('File data:', jsonString)
        try {
            const json = JSON.parse(jsonString)
            for (p of json) {
                const parentCategory = new Category({
                    name: p.name
                })
                await parentCategory.save()

                for (s of p.subcategory) {
                    const newSubcategory = new Category({
                        name: s.name,
                        parent: parentCategory
                    })
                    await newSubcategory.save()
                }

                mongoose.connection.close()
            }
        } catch (err) {
            console.log('Error parsing JSON string:', err)
        }
    })
}
else if (process.argv[2].toLowerCase() === 'load_users') {
    // Read product models from json
    fs.readFile('./example_data/users.json', 'utf8', async (err, jsonString) => {
        if (err) {
            console.log("File read failed:", err)
            return
        }
        console.log('File data:', jsonString)
        try {
            const json = JSON.parse(jsonString)
            for (p of json) {
                const user = new User({
                    name: p.name,
                    wishlist: [],
                    size: p.size
                })
                await user.save()
            }
            mongoose.connection.close()
        } catch (err) {
            console.log('Error parsing JSON string:', err)
        }
    })
}
else if (process.argv[2].toLowerCase() === 'load_items') {
    // Get random user
    const conditions = ['good', 'decent', 'bad']
    const status_options = ['public', 'private', 'for sale']
    const size_options = ['XL', 'L', 'M', 'S']

    function randomDate(start, end) {
        return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
    }

    fs.readFile('./example_data/products.json', 'utf8', async (err, jsonString) => {
        if (err) {
            console.log("File read failed:", err)
            return
        }
        const users = await User.find({})
        try {
            const json = JSON.parse(jsonString)
            console.log(json)
            // Take 100 times random sample from json
            for (let x = 0; x < 20; x++) {
                const randItem = json[Math.floor(Math.random() * json.length)]

                const item = new Item({
                    owner: users[Math.floor(Math.random() * users.length)],
                    conditions: conditions[Math.floor(Math.random() * conditions.length)],
                    status: status_options[Math.floor(Math.random() * status_options.length)],
                    age: Math.floor(Math.random() * (20 + 1)),
                    price: Number(Math.floor(Math.random() * (300 + 1))),
                    size: size_options[Math.floor(Math.random() * size_options.length)],
                    date: randomDate(new Date(2012, 0, 1), new Date()),
                    picture: randItem.image,
                    product: await Product.findOne({ name: randItem.name })
                })
                await item.save()
            }

            mongoose.connection.close()

        } catch (err) {
            console.log('Error parsing JSON string:', err)
        }
    })
}
else if (process.argv[2].toLowerCase() === 'generate_wishlists') {
    (async () => {
        const users = await User.find({})
        const products = await Product.find({})
        const numberOfWishes = 20
        for (let i = 0; i < numberOfWishes; i++) {
            const randUser = users[Math.floor(Math.random() * users.length)]
            const randProduct = products[Math.floor(Math.random() * products.length)]
            const existingWish = await Wish.findOne({product: randProduct, user: randUser})
            if (existingWish != undefined) {
                console.log(`${randUser.name} already has ${randProduct.name} in wishlist`)
            }
            else {
                console.log(`Adding product ${randProduct.name} for ${randUser.name}`)
                const newWish = new Wish({
                    user: randUser,
                    product: randProduct
                })
                await newWish.save()
            }
        }
        mongoose.connection.close()
    })()
}
else {
    // Other arv length not supported.
    console.log('unsupported argument')
    process.exit(1)
}