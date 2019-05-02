const assert = require('chai').assert;
//const app = require('./server');
const sayHello = require('./server').sayHello;
const addNumbers = require('./server').addNumbers;

describe('App', () => {
  it('sayHello should return hellos', () => {
    let result = sayHello();
    assert.equal(result, 'hellos');
  });

  it('sayHello should return type string', () => {
    let result = sayHello();
    assert.typeOf(result, 'string')
  });

  it('addNumbers should be greater than 5', () => {
    let result = addNumbers(-1, 5);
    assert.isAbove(result, 5);
  });
});