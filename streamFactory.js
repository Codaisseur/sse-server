const { Router } = require('express')

module.exports = function (stream) {
  const router = new Router()

  router.get('/stream', (request, response) => {
    stream.init(request, response)
  })

  return router
}
