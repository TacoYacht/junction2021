require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')

const app = express()
app.use(cors())
app.use(express.json())
app.use(express.static('build'))

// Use tiny for all others than post
app.use(morgan('tiny', {
  skip: function (req, res) { return req.method == 'POST' }
}))

products = {
  
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
  res.json(products)
})

const generateId = () => {
  const maxId = products.length > 0
    ? Math.max(...products.map(n => n.id))
    : 0
  return maxId + 1
}

app.post('/api/products', (request, response) => {
  const body = request.body

  if (!body.content) {
    return response.status(400).json({ 
      error: 'content missing' 
    })
  }

  const product = {
    content: body.content,
    id: generateId(),
  }

  products = products.concat(note)

  response.json(note)
})

app.get('/api/products/:id', (request, response) => {
  const id = Number(request.params.id)
  const product = products.find(product => product.id === id)

  if (product) {
    response.json(product)
  } else {
    response.status(404).end()
  }
})

app.delete('/api/products/:id', (request, response) => {
  const id = Number(request.params.id)
  products = products.filter(product => product.id !== id)

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