var Assertion = require('../assertion')

/**
 * Non-strict equal (==)
 * @param {any} actual
 * @param {any} expected
 */
function EqualAssertion(actual, expected) {
  Assertion.call(this)

  this.actual = actual
  this.expected = expected
}

EqualAssertion.prototype = Object.create(Assertion.prototype)
EqualAssertion.prototype.constructor = EqualAssertion

EqualAssertion.prototype.fn = function () {
  return this.actual == this.expected
}

Object.defineProperty(EqualAssertion.prototype, 'errMsg', {
  get: function () {
    return 'Expected ' + this.expected + ' to equal ' + this.actual
  }
})

module.exports = EqualAssertion
