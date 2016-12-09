const Hapi = require('hapi')

const Version = require('./version')
const Private = require('./private')


exports.init = function (port, next) {
  const server = new Hapi.Server()

  server.connection({ host: 'localhost', port })

  server.route({
    method: 'GET',
    path: '/',
    handler: function (request, reply) {
      reply('Hello')
    }
  })

  server.register([Version, Private], (err) => {
    if (err) return next(err)

    server.start((err) => {
      return next(err, server)
    })
  })
}
