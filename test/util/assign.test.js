var assert = require('assert');
var assign = require('../../lib/util/assign');

describe('util:assign', function () {
  it('Should properly export', function () {
    assert.equal(typeof assign, 'function');
  });

  it('Should properly assign objects', function () {
    var obj1 = {foo: 'bar'};
    var obj2 = {bar: 'foo'};

    assert.deepEqual(assign(obj1, obj2), {
      foo: 'bar',
      bar: 'foo'
    });
  });
});
