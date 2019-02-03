# reksio :dog2:

A beginner-friendly synchronous test library for learning

> Work In Progress, therefore the API is highly unstable

Example:
```js
var test = require('reksio')

test('Some stuff', function (assert) {
  // assert.eqv(4, 5)
  assert.eqv(5, 5)
  assert.equal(9, 9)
  assert.equal(8, 9)
  assert.deepEqual([1], [1])
  assert.deqv([3, 4, 6], [3, 4, 5])
})
```

Result:
```sh
Woof!🐕
Equality stuff
        👎 Expected 9 to equal 8
        👎 Expected 3,4,5 to be deeply equal 3,4,6
Total🐾
        3👍
        2👎
        0✋
```
