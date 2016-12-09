const Code = require('code')
const Lab = require('lab')

const Package = require('../package.json')
const University = require('../lib')

const lab = exports.lab = Lab.script()
const describe = lab.experiment
const expect = Code.expect
const it = lab.test

describe('/version', () => {
  it('returns the version from package.json', (done) => {
    University.init(0, (err, server) => {
      expect(err).to.not.exist()

      server.inject('/version', (res) => {
        expect(res.statuscode).to.equal(200)
        expect(res.result).to.equal({ version: Package.version })

        server.stop(done)
      })
    })
  })
})
