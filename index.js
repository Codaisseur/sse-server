const express = require('express')
const SSE = require('express-sse')
const cors = require('cors')

const app = express()
const stream = new SSE()

app.use(cors())

app.get('/stream', (request, response) => {
  console.log('stream test')
  stream.init(request, response)
})
app.get(
  '/x',
  (request, response, next) => {
    console.log('x test')
    stream.send('hello')
    return response.send('hello')
  })

const port = 5000

app.listen(port, () => console.log(port))
