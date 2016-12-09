const Server = require('./index')

Server.init(8000, (err, server) => {
  if (err) throw err

  console.log(`Server started at ${server.info.uri}`);
})
