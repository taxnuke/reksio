/**
 * Assertion states enum
 */
var states = Object.freeze({
  failed: -1,
  pending: 0,
  passed: 1
})

/**
 * Base Assertion superclass
 */
function Assertion() {
  this._state = states.pending
}

/**
 * Executes the assertion
 */
Assertion.prototype.exec = function () {
  var result = this.fn()

  if (result) {
    this._state = states.passed
  } else {
    this._state = states.failed
  }

  return result
}

Object.defineProperties(Assertion.prototype, {
  isPending: {
    get: function () {
      return this._state === states.pending
    }
  },
  isFailed: {
    get: function () {
      return this._state === states.failed
    }
  },
  isPassed: {
    get: function () {
      return this._state === states.passed
    }
  },
})

module.exports = Assertion
