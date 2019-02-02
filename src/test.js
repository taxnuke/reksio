var Assertion = require('./assertion')

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
  console.log('\nWoof!\uD83D\uDC15')
  console.log(this._desc)

  this._queue.forEach(function (assertion) {
    if (!assertion.exec()) {
      console.log('\t\uD83D\uDC4E', assertion.msg)
    }
  })

  var total = this._queue.reduce(function (acc, c) {
    if (c.isPassed) {
      acc.passed++
    } else if (c.isFailed) {
      acc.failed++
    } else {
      acc.pending++
    }

    return acc
  }, { passed: 0, failed: 0, pending: 0 })

  console.log(
    '\nTotal\uD83D\uDC3E\n\t%d\uD83D\uDC4E\n\t%d\uD83D\uDC4D\n\t%d\u270B',
    total.passed,
    total.failed,
    total.pending
  )
}

module.exports = Test
