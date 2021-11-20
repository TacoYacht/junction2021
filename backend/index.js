require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')



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


users = {
  
}

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

app.get('/api/products', (req, res) => {
  Product.find({}).then(products => {
    res.json(products)
  })
})

const generateProductId = () => {
  const maxId = products.length > 0
    ? Math.max(...products.map(n => n.id))
    : 0
  return maxId + 1
}

app.post('/api/products', (request, response) => {
  const body = request.body

  if ( body.model === undefined || body.owner === undefined || body.age === undefined || body.condition === undefined || body.size === undefined) {
    return response.status(400).json({ error: 'required content missing (either model, owner, age, condition or size)' })
  }

  const product = new Product({
    model: body.model,
    owner: body.owner,
    age: body.age,
    picture: body.picture || [],
    condition: body.condition,
    size: body.size,
    status: body.status || 'Not on sale',
    date: new Date(),
  })

  product.save().then(savedProduct => {
    response.json(savedProduct)
  })
})

app.get('/api/products/:id', (request, response) => {
  Product.findById(request.params.id).then(product => {
    response.json(product)
  })
})

app.delete('/api/products/:id', (request, response) => {
  const id = Number(request.params.id)
  products = products.filter(product => product.id !== id)

  response.status(204).end()
})

app.get('/api/users', (req, res) => {
  res.json(users)
})

const generateUserId = () => {
  const maxId = users.length > 0
    ? Math.max(...users.map(n => n.id))
    : 0
  return maxId + 1
}

app.post('/api/users', (request, response) => {
  const body = request.body

  if (!body.name || !body.nick) {
    return response.status(400).json({ 
      error: 'content missing' 
    })
  }

  const user = {
    name: body.name,
    nick: body.nick,
    picture: body.picture,
    address: body.address,
    id: generateUserId(),
  }

  users.push(user)

  response.json(user)
})

app.get('/api/users/:id', (request, response) => {
  const id = Number(request.params.id)
  const user = users.find(user => user.id === id)

  if (user) {
    response.json(user)
  } else {
    response.status(404).end()
  }
})

app.delete('/api/users/:id', (request, response) => {
  const id = Number(request.params.id)
  users = users.filter(user => user.id !== id)

  response.status(204).end()
})


const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})