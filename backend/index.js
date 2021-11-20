require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const path = require('path')



const Item = require('./models/item')
const User = require('./models/user')
const Product = require('./models/product')
const Category = require('./models/category')
const Pattern = require('./models/pattern')
const Wish = require('./models/wish')

// const PORT = process.env.PORT
const app = express()
app.use(cors())
app.use(express.json())
app.use(express.static('build'))

// Use tiny for all others than post
app.use(morgan('tiny', {
  skip: function (req, res) { return req.method == 'POST' }
}))


// Create custom token, include everything else from tiny and
// add req.body behind
morgan.token('custom',
    function (tokens, req, res) {
        return [
            tokens.method(req, res),
            tokens.url(req, res),
            tokens.status(req, res),
            tokens.res(req, res, 'content-length'), '-',
            tokens['response-time'](req, res), 'ms',
            JSON.stringify(req.body)
        ].join(' ')
    })
// Use custom only for post
app.use(morgan('custom', {
    skip: function (req, res) { return req.method != 'POST' }
}))

app.get('/api/items', (req, res) => {
  Item.find({}).then(items => {
    res.json(items)
  })
})

app.post('/api/items', (request, response) => {
  const body = request.body

  if ( body.product === undefined || body.owner === undefined || body.age === undefined || body.condition === undefined || body.size === undefined) {
    return response.status(400).json({ error: 'required content missing (either model, owner, age, condition or size)' })
  }

  const item = new Item({
    product: body.product,
    owner: body.owner,
    age: body.age,
    picture: body.picture || [],
    condition: body.condition,
    size: body.size,
    status: body.status || 'Not on sale',
    created: new Date(),
    price: body.price || null
  })

  item.save().then(savedItem => {
    response.json(savedItem)
  })
})

app.get('/api/items/:id', (request, response) => {
  Item.findById(request.params.id).then(item => {
    response.json(item)
  })
})

app.delete('/api/items/:id', (request, response) => {
  Item.findByIdAndDelete(request.params.id).then(item => {
    response.json(item)
  })
})

app.get('/api/users', (req, res) => {
  User.find({}).then(users => {
    res.json(users)
  })
})

app.post('/api/users', (request, response) => {
  const body = request.body

  if ( body.name === undefined  || body.size === undefined) {
    return response.status(400).json({ error: 'name or size missing' })
  }

  const user = new User({
    name: body.name,
    size: body.size,
    wishlist: []
  })

  user.save().then(savedUser => {
    response.json(savedUser)
  })
})

app.get('/api/users/:id', (request, response) => {
  User.findById(request.params.id).then(user => {
    response.json(user)
  })
})

app.delete('/api/users/:id', (request, response) => {
  User.findByIdAndDelete(request.params.id).then(user => {
    response.json(user)
  })
})

app.get('/api/users/:id/items', (request, response) => {
  Item.find({ owner: request.params.id }).then(items => response.json(items))
})


app.get('/api/products', (req, res) => {
  Product.find({}).then(products => {
    res.json(products)
  })
})

app.post('/api/products', (request, response) => {
  const body = request.body

  if ( body.name === undefined  || body.category === undefined || body.pattern === undefined || body.originalPrice === undefined || body.availableColors === undefined) {
    return response.status(400).json({ error: 'name, category, pattern, originalPrice or availableColors missing' })
  }

  const product = new Product({
    name: body.name,
    category: body.category,
    pattern: body.pattern,
    originalPrice: body.originalPrice,
    availableColors: body.availableColors
  })

  product.save().then(savedProduct => {
    response.json(savedProduct)
  })
})

app.post('/api/patterns', (request, response) => {
  const body = request.body

  if ( body.name === undefined  || body.designer === undefined) {
    return response.status(400).json({ error: 'name or designer missing' })
  }

  const pattern = new Pattern({
    name: body.name,
    designer: body.designer
  })

  pattern.save().then(savedPattern => {
    response.json(savedPattern)
  })
})

app.post('/api/categories', (request, response) => {
  const body = request.body

  if ( body.name === undefined  || body.designer === undefined) {
    return response.status(400).json({ error: 'name or designer missing' })
  }

  const pattern = new Pattern({
    name: body.name,
    designer: body.designer
  })

  pattern.save().then(savedPattern => {
    response.json(savedPattern)
  })
})

app.get('/api/categories', (req, res) => {
  Category.find({}).then(categories => {
    res.json(categories)
  })
})

app.get('/api/patterns', (req, res) => {
  Pattern.find({}).then(patterns => {
    res.json(patterns)
  })
})

app.post('/api/wishes', (request, response) => {
  const body = request.body

  if ( body.product === undefined || body.user === undefined) {
    return response.status(400).json({ error: 'product and user are needed' })
  }

  const wish = new Wish({
    user: body.user,
    product: body.product
  })

  wish.save().then(savedWish => {
    response.json(savedWish)
  })
})

app.get('/api/wishes', (request, response) => {
  Wish.find({}).then(wishes => {
    res.json(wishes)
  })
})

app.delete('/api/wishes/:id', (request, response) => {
  Wish.findByIdAndDelete(request.params.id).then(wish => {
    response.json(wish)
  })
})

app.get('/api/users/:id/wishes', (request, response) => {
  Wish.find({user: request.params.id}).then(wishes => {
    response.json(wishes)
  })
})

const unknownEndpoint = (request, response) => {
  response.sendFile(path.join(__dirname, '/build/index.html'), function(err) {
    if (err) {
      response.status(500).send(err)
    }
  })
}

app.use(unknownEndpoint)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})