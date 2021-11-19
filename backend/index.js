const express = require('express')
const app = express()
const cors = require('cors')

app.use(express.static('build'))
app.use(cors())
app.use(express.json())

const requestLogger = (request, response, next) => {
  console.log('Method:', request.method, request.path, request.body)
  next()
}

app.use(requestLogger)

let products = [
  {
    id: 1, // Generated id
    name: "Marimekon paita :)", // Official product name
    age: "5", // Age in years
    picture: "<url-to-picture>", // url to picture
    condition: "good" // Condition good | bad | ugly
  },
  {
    id: 2, // Generated id
    name: "Marimekon astia :)", // Official product name
    age: "3", // Age in years
    picture: "<url-to-picture>", // url to picture
    condition: "bad"
  },
  {
    id: 3, // Generated id
    name: "Marimekon jou muu tuote :)", // Official product name
    age: "5", // Age in years
    picture: "<url-to-picture>", // url to picture
    condition: "ugly"
  }

]

app.get('/', (req, res) => {
  res.send('<h1>Hello World!</h1>')
})

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