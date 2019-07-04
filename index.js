const express = require('express')
const SSE = require('express-sse')
const cors = require('cors')
const bodyParser = require('body-parser')

const app = express()
app.use(cors())

const jsonParser = bodyParser.json()
app.use(jsonParser)

const messages = [
  'hello',
  'Can you see this?'
]
const json = JSON.stringify(messages)
const stream = new SSE(json)

function onStream (request, response) {
  stream.init(request, response)
}
app.get('/stream', onStream)

function onMessage (request, response) {
  const { message } = request.body

  messages.push(message)
  stream.send(messages)

  const json = JSON.stringify(messages)
  stream.updateInit(json)

  return response.send(message)
}
app.post('/message', onMessage)

const port = 5000
function onListen () {
  console.log(`Listening on :${port}`)
}
app.listen(port, onListen)
