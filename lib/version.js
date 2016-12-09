const Package = require('../package.json')
const Users = require('./users.json')

function auth (request, username, password, callback) {
  const user = Users[username]
  console.log(user)
  if (!user || user.password !== password) {
    return callback(null, false)
  }

  user.username = username

  return callback(null, true, user)
}


exports.register = function (server, options, next) {
  server.route({
    method: 'GET',
    path: '/version',
    handler: function (request, reply) {
      reply(`version: ${Package.version}`)
    }
  })

  return next()
}

exports.register.attributes = {
  name: 'version'
}
