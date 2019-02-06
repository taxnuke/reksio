var emoji = require('./emoji')
var assertMixin = require('./assertions/_mixin')

/**
 * @param {String} desc - test description
 */
function Test(desc) {
  this._desc = desc
  this._queue = []
  this._started = new Date()
}

/**
 * Returns the amount of passed, failed and pending assertion
 */
Test.prototype.getTotal = function () {
  return this._queue.reduce(function (acc, c) {
    if (c.isPassed) {
      acc.passed++
    } else if (c.isFailed) {
      acc.failed++
    } else {
      acc.pending++
    }

    return acc
  }, { passed: 0, failed: 0, pending: 0 })
}

// Mixin setup
for (var key in assertMixin) {
  Test.prototype[key] = assertMixin[key]
}

/**
 * Runs assertions in the queue
 */
Test.prototype.run = function () {
  var self = this

  this._queue.forEach(function (assertion) {
    if (!assertion.exec()) {
      console.log('\t' + self._desc + emoji.failed, assertion.errMsg)
    }
  })

  var total = this.getTotal()

  if (!total.failed) {
    console.log('\t' + this._desc + ' ' + emoji.passed + ' (' + (new Date() - this._started) + 'ms)')
  }
}

module.exports = Test
