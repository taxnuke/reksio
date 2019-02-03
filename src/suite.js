var Test = require('./test')
var emoji = require('./emoji')

function Suite(name) {
  this._tests = []
  this.name = name

  console.log('\n' + name + emoji.dog)
}

Suite.prototype.it = function (desc, cb) {
  var t = new Test(desc)
  this._tests.push(t)
  cb(t)
  t.run()

  return this
}

Suite.prototype.xit = function (desc) {
  var t = new Test(desc)
  this._tests.push(t)
  console.log('\t' + desc + ' ' + emoji.pending)

  return this
}

module.exports = Suite
