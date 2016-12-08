const Package = require('../package.json')

exports.register = function (server, options, next) {
  server.route({
    method: 'GET',
    path: '/version',
    handler: function (request, reply) {
      reply(`version: ${Package.version}`)
    }
  })

  return next
}

exports.register.attributes = {
  name: 'version'
}
