'use strict'

var Test = require('./src/test')

function test(desc, cb) {
  var _test = new Test(desc)

  cb(_test)
  _test.run()
}

module.exports = test
