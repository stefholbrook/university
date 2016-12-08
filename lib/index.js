const Hapi = require('hapi')

const Version = require('./version')

const server = new Hapi.Server()

server.connection({ host: 'localhost', port: process.env.PORT || 8000 })

server.route({
  method: 'GET',
  path: '/',
  handler: function (request, reply) {
    reply('Hello')
  }
})

server.register(Version, (err) => {
  if (err) throw err

  server.start((err) => {
    if (err) throw err

    console.log(`Server running at ${server.info.uri}`)
  })
})
