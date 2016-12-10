const Fs = require('fs')

const internals = {}

exports.tls = {
  key: Fs.readFileSync('./lib/certs/key.key'),
  key: Fs.readFileSync('./lib/certs/cert.crt'),

  // Only necessary if using the client certificate authentication
  requestCert: false,

  // Only necessary if client is using the self-signed certificate
  ca: []
}
