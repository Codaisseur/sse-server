const express = require('express')
const SSE = require('json-sse')
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
  const json = JSON.stringify(messages)
  stream.send(json)

  stream.updateInit(json)

  return response.send(message)
}
app.post('/message', onMessage)

const port = process.env.PORT || 5000
function onListen () {
  console.log(`Listening on :${port}`)
}
app.listen(port, onListen)
