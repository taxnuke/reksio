var states = Object.freeze({
  pending: 'Pending',
  failed: 'Failed',
  passed: 'Passed'
})

function Assertion(fn, msg) {
  this.state = states.pending
  this.fn = fn
  this.msg = msg
}

Assertion.prototype.exec = function () {
  var result = this.fn()

  if (result) {
    this.state = states.passed
  } else {
    this.state = states.failed
  }

  return result
}

function Test(desc) {
  this._desc = desc
  this._queue = []
}

Test.prototype.eqv = function (actual, expected, msg) {
  this._queue.push(new Assertion(function () {
    return actual == expected
  }, msg))
}

Test.prototype.run = function () {
  console.log(this._desc)
  this._queue.forEach(function (assertion) {
    if (assertion.exec()) {
      console.log('\t👍')
    } else {
      console.log('\t👎', assertion.msg)
    }
  })
}

function test(desc, cb) {
  var _test = new Test(desc)

  cb(_test)
  _test.run()
}

module.exports = test
