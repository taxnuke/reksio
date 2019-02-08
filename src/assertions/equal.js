var Assertion = require('./_base')

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

/**
 * Assertion logic
 */
EqualAssertion.prototype.fn = function () {
  return this.actual == this.expected
}

/**
 * Error message
 */
Object.defineProperty(EqualAssertion.prototype, 'errMsg', {
  get: function () {
    return 'expected: ' + this.expected + ' | actual: ' + this.actual
  }
})

module.exports = EqualAssertion
