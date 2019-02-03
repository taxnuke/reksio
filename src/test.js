var emoji = require('./emoji')
var assertMixin = require('./assertions/_mixin')

/**
 * @param {String} desc - test description
 */
function Test(desc) {
  this._desc = desc
  this._queue = []
}

/**
 * Getter property for assertion skipping
 */
Object.defineProperty(Test.prototype, 'x', {
  get: function () {
    this.skipNext = true

    return this
  }
})

// Mixin setup
for (var key in assertMixin) {
  Test.prototype[key] = assertMixin[key]
}

/**
 * Runs assertions in the queue
 */
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
