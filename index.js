'use strict'

var Suite = require('./src/suite')

module.exports = function (name) {
  return new Suite(name)
}
