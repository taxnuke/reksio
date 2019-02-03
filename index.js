'use strict'

var Test = require('./src/test')

module.exports = function (desc, cb) {
  var _test = new Test(desc)

  cb(_test)
  _test.run()
}
