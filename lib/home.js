'use strict'

// Load modules

const Path = require('path')


// Declare internals

const internals = {
  rootPath: Path.resolve(__dirname, '../'),
  viewsPath: Path.resolve(__dirname, '../views')
}


exports.register = function (server, options, next) {

  // Code inside the callback function of server.dependency will only be executed
  // after vision plugin has been registered. It's triggered by server.start,
  // and runs before actual starting of the server.  It's done because the call to
  // server.views upon registration would fail and make the server crash if the
  // server is not previously decorated with the views method by vision.
  server.dependency('inert', 'vision', internals.after)

  return next()
}

exports.register.attributes = {
  name: 'Home'
}


internals.after = function (server, next) {

  server.views({
    engines: {
      html: require('handlebars')
    },
    path: '../views',
    partialsPath: '../views/partials'
    relativeTo: __dirname
  })

  // Routing for static files
  server.route([
    {
      method: 'GET',
      path: '/images/{assetpath}',
      handler: {
        directory: {
          path: '../assets/images'
        }
      }
    },
    {
      method: 'GET',
      path: '/scripts/{assetpath}',
      handler: {
        directory: {
          path: '../assets/scripts'
        }
      }
    },
    {
      method: 'GET',
      path: '/styles/{assetpath}',
      handler: {
        directory: {
          path: '../assets/styles'
        }
      }
    }
  ])

  // Home routing
  server.route([
    {
      method: 'GET',
      path: '/login',
      config: {
        description: 'Shows login form',
        handler: {
          view: {
            template: 'login'
          }
        }
      }
    },
    {
      method: 'GET',
      path: '/home',
      config: {
        description: 'Returns the home page',
        handler: {
          view: {
            template: 'home',
          }
        }
      }
    }
  ])

  return next()
}
