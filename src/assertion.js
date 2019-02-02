var states = Object.freeze({
  pending: 'Pending',
  failed: 'Failed',
  passed: 'Passed'
})

function Assertion(fn, msg) {
  this._state = states.pending
  this.fn = fn
  this.msg = msg
}

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
