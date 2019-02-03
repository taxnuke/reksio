var Assertion = require('./_base')

/**
 * Deep equality between actual and expected
 * @param {Array} actual
 * @param {Array} expected
 */
function DeepEqualAssertion(actual, expected) {
  Assertion.call(this)

  this.actual = actual
  this.expected = expected
}

DeepEqualAssertion.prototype = Object.create(Assertion.prototype)
DeepEqualAssertion.prototype.constructor = DeepEqualAssertion

/**
 * Assertion logic
 */
DeepEqualAssertion.prototype.fn = function () {
  function deepEqual(a, b) {
    if (Array.isArray(a) && Array.isArray(b) && a.length === b.length) {
      for (var i = 0; i < a.length; i++) {
        if (Array.isArray(a[i]) || Array.isArray(b[i])) {
          return deepEqual(a[i], b[i])
        } else if (a[i] !== b[i]) {
          return false
        }
      }
      return true
    } else {
      return false
    }
  }

  return deepEqual(this.actual, this.expected)
}

/**
 * Error message
 */
Object.defineProperty(DeepEqualAssertion.prototype, 'errMsg', {
  get: function () {
    return 'Expected ' + this.expected + ' to be deeply equal ' + this.actual
  }
})

module.exports = DeepEqualAssertion
