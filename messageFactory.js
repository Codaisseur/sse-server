const { Router } = require('express')

const messages = [
  'hello',
  'Can you see this?'
]

module.exports = function (stream) {
  const router = new Router()

  router.post('/message', (request, response) => {
    const { message } = request.body

    messages.push(message)
    const json = JSON.stringify(messages)
    stream.send(json)

    stream.updateInit(json)

    return response.send(message)
  })

  return router
}
