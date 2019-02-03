# reksio :dog2:

A beginner-friendly synchronous test library for learning

> Work In Progress, therefore the API is highly unstable

Example:
```js
var describe = require('./index')

describe('Some suite')
  .xit('foo bar', function (assert) {
    assert.equal(3, 3)
    assert.equal(2, 3)
  })
  .it('baz', function (assert) {
    assert.deepEqual([1, 2, 3], [1, 2])
    assert.deepEqual([1, 2], [1, 2])
  })

describe('Other suite')
  .it('qux', function (assert) {
    assert.equal(5, 6)
    assert.eqv(8, 7)
  })
  .it('quux', function (assert) {
    assert.deepEqual([1, 2, 3], [1, 2, 3])
    assert.deqv([1, 2], [1, 2])
  })

```

Result:
```sh
Some suite??
        foo bar ?
        baz
                ?? Expected 1,2,3 to be deeply equal 1,2

Other suite??
        qux
                ?? Expected 5 to equal 6
                ?? Expected 8 to equal 7
        quux
        OK!
```
