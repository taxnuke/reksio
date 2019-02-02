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

Object.defineProperties(Assertion.prototype, {
  isPending: {
    value: function () {
      return this._state === states.pending
    }
  },
  isFailed: {
    value: function () {
      return this._state === states.failed
    }
  },
  isPassed: {
    value: function () {
      return this._state === states.passed
    }
  },
})

Assertion.prototype.exec = function () {
  var result = this.fn()

  if (result) {
    this.state = states.passed
  } else {
    this.state = states.failed
  }

  return result
}

module.exports = Assertion
