var EqualAssertion = require('./equal')

function equal(actual, expected) {
  var ea = new EqualAssertion(actual, expected)

  if (this.skipNext) {
    ea.skip()
  }

  this.skipNext = false
  this._queue.push(ea)
}

module.exports = {
  equal: equal,
  eqv: equal
}
