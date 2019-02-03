var EqualAssertion = require('./equal')
var DeepEqualAssertion = require('./deepEqual')

function equal(actual, expected) {
  var ea = new EqualAssertion(actual, expected)

  if (this.skipNext) {
    ea.skip()
    this.skipNext = false
  }

  this._queue.push(ea)
}

function deepEqual(actual, expected) {
  var dea = new DeepEqualAssertion(actual, expected)

  if (this.skipNext) {
    dea.skip()
    this.skipNext = false
  }

  this._queue.push(dea)
}

module.exports = {
  equal: equal,
  eqv: equal,

  deepEqual: deepEqual,
  deqv: deepEqual
}
