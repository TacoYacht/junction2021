const express = require('express')
const app = express()
const cors = require('cors')

app.use(express.static('build'))
app.use(cors())
app.use(express.json())

const requestLogger = (request, response, next) => {
  console.log('Method:', request.method)
  console.log('Path:  ', request.path)
  console.log('Body:  ', request.body)
  console.log('---')
  next()
}

app.use(requestLogger)

let products = [
  {
    id: 1,
    content: "tuote",
  },
  {
    id: 2,
    content: "tuote",
  },
  {
    id: 3,
    content: "tuote",
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

  const note = {
    content: body.content,
    important: body.important || false,
    date: new Date(),
    id: generateId(),
  }

  products = products.concat(note)

  response.json(note)
})

app.get('/api/products/:id', (request, response) => {
  const id = Number(request.params.id)
  const note = products.find(note => note.id === id)

  if (note) {
    response.json(note)
  } else {
    response.status(404).end()
  }
})

app.delete('/api/products/:id', (request, response) => {
  const id = Number(request.params.id)
  products = products.filter(note => note.id !== id)

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