require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const path = require('path')



const Item = require('./models/item')
const User = require('./models/user')
const Product = require('./models/product')

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