const express = require('express')
const SSE = require('json-sse')
const cors = require('cors')
const bodyParser = require('body-parser')
const streamFactory = require('./streamFactory')
const messageFactory = require('./messageFactory')

const app = express()
app.use(cors())

const jsonParser = bodyParser.json()
app.use(jsonParser)

const stream = new SSE()

// app.get('/stream', (request, response) => {
//   stream.init(request, response)
// })
const streamRouter = streamFactory(stream)
app.use(streamRouter)

// app.post('/message', (request, response) => {
//   const { message } = request.body
//
//   messages.push(message)
//   const json = JSON.stringify(messages)
//   stream.send(json)
//
//   stream.updateInit(json)
//
//   return response.send(message)
// })
//
const messageRouter = messageFactory(stream)
app.use(messageRouter)

const port = process.env.PORT || 5000
function onListen () {
  console.log(`Listening on :${port}`)
}
app.listen(port, onListen)
