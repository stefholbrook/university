const Basic = require('hapi-auth-basic')

const Users = require('./users.json')

function auth (request, username, password, callback) {
  const user = Users
  console.log(user)
  if (!user || user.password !== password) {
    return callback(null, false)
  }

  user.username = username

  return callback(null, true, user)
}

exports.register = function (server, options, next) {
  server.register(Basic, (err) => {
    if (err) return next(err)
  })

  server.auth.strategy('basic', 'basic', { validateFunc: auth })

  server.route({
    method: 'GET',
    path: '/private',
    config: {
      auth: 'basic',
      handler: function (request, reply) {
        const html = `<div>Hello ${request.auth.credentials.username}</div>`

        return reply(html)
      }
    }
  })

  return next()
}

exports.register.attributes = {
  name: 'private'
}
