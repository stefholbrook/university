const Hapi = require('hapi')
const Package = require('../package.json')

const server = new Hapi.Server()

server.connection({ host: 'localhost', port: process.env.PORT || 8000 })

server.route({
  method: 'GET',
  path: '/',
  handler: function (request, reply) {
    reply('Hello')
  }
})

server.route({
  method: 'GET',
  path: '/version',
  handler: function (request, reply) {
    reply(`version: ${Package.version}`)
  }
})

server.start((err) => {
  if (err) throw err

  console.log(`Server running at ${server.info.uri}`)
})
