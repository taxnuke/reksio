var EqualAssertion = require('./assertions/equal')
var emoji = require('./emoji')

/**
 * @param {String} desc - test description
 */
function Test(desc) {
  this._desc = desc
  this._queue = []
}

// Should be moved to some factory
function equal(actual, expected) {
  var equalAssertion = new EqualAssertion(actual, expected)
  if (this.skipNext) {
    equalAssertion.skip()
  }

  this.skipNext = false
  this._queue.push(equalAssertion)
}

Object.defineProperty(Test.prototype, 'x', {
  get: function () {
    this.skipNext = true

    return this
  }
})

Test.prototype.eqv = equal
Test.prototype.equal = equal

Test.prototype.run = function () {
  console.log('Woof!' + emoji.dog + '\n')
  console.log(this._desc)

  this._queue.forEach(function (assertion) {
    if (!assertion.exec()) {
      console.log('\t' + emoji.failed, assertion.errMsg)
    } else {
      console.log('\t' + emoji.passed, assertion.actual)
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
