var Assertion = require('./assertion')
var emoji = require('./emoji')

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
  console.log('Woof!' + emoji.dog + '\n')
  console.log(this._desc)

  this._queue.forEach(function (assertion) {
    if (!assertion.exec()) {
      console.log('\t' + emoji.failed, assertion.msg)
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
    '\nTotal' + emoji.paws +
    '\n\t%d' + emoji.passed +
    '\n\t%d' + emoji.failed +
    '\n\t%d' + emoji.pending,
    total.passed,
    total.failed,
    total.pending
  )
}

module.exports = Test
