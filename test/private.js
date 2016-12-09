const Code = require('code')
const Lab = require('lab')

const University = require('../lib')

const lab = exports.lab = Lab.script()
const describe = lab.experiment
const expect = Code.expect
const it = lab.test

describe('/private', () => {
  it('returns the private page', (done) => {
    University.init(0, (err, server) => {
      expect(err).to.not.exist()

      server.inject('/private', (res) => {
        expect(res.statuscode).to.equal(200)

        server.stop(done)
      })
    })
  })
})
