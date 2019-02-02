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
  console.log('Woof! 🐕\n')
  console.log(this._desc)
  this._queue.forEach(function (assertion) {
    if (!assertion.exec()) {
      console.log('\t👎', assertion.msg)
    }
  })

  var total = this._queue.reduce(function (acc, c) {
    if (c.state === states.passed) {
      acc.passed++
    } else if (c.state === states.failed) {
      acc.failed++
    } else {
      acc.pending++
    }

    return acc
  }, { passed: 0, failed: 0, pending: 0 })

  console.log(
    '\nTotal🐾\n\t%d 👍\n\t%d 👎\n\t%d ✋',
    total.passed,
    total.failed,
    total.pending
  )
}

function test(desc, cb) {
  var _test = new Test(desc)

  cb(_test)
  _test.run()
}

module.exports = test
