const cors = require('cors')
const express = require('express')
var morgan = require('morgan')
const app = express()

app.use(cors())

morgan.token('post-content', (req, res) => {
  if (req.method === 'POST')
    return JSON.stringify(req.body)
  return ''
})

app.use(express.json())
app.use(morgan(
  ':method :url :status :res[content-length] - :response-time ms :post-content'
))


let persons = [
    { 
      "id": "1",
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": "2",
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": "3",
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": "4",
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.get('/', (request, response) => {
  response.send('<h1>This is the main page</h1>')
})

app.get('/api/persons', (request, response) => {
  response.json(persons)
})

app.get('/api/persons/:id', (request, response) => {
  const id = request.params.id
  const person = persons.find(person => person.id === id)

  if (person)
    response.json(person)
  else
    response.status(404).end()
})

app.delete('/api/persons/:id', (request, response) => {
  const id = request.params.id
  persons = persons.filter(person => person.id !== id)

  response.status(204).end()
})

const generateId = () => {
  const rangeMax = 10000

  const randomFloat = Math.random() * rangeMax
  return String(Math.floor(randomFloat))
}

app.post('/api/persons', (request, response) => {
  const body = request.body
  if (!body.name) {
    return response.status(400).json({
      error: 'name missing'
    })
  }

  if (!body.number) {
    return response.status(400).json({
      error: 'number missing'
    })
  }

  console.log(persons)
  if (persons.find(p => p.name === body.name)) {
    return response.status(400).json({
      error: 'this name already exists'
    })
  }

  const person = {
    id: generateId(),
    name: body.name,
    number: body.number,
  }

  persons = persons.concat(person)

  response.json(person)
})

app.get('/info', (request, response) => {
  const infoString = `Phonebook has info for ${persons.length} people`

  const timeString = Date()

  response.send(`<p>${infoString}</p><p>${timeString}</p>`)
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
