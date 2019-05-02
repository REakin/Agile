const assert = require('chai').assert;
const Player = require('../views/JS/Clicker').Player;

// Testing Player class
describe('Player', () => {
  
  // Testing 
  describe('#constructor', () => {
    let player = new Player('bang', 30, 15, 10);

    // Test valid 
    it('constructor should save username as a string', () => {
      assert.typeOf(player.name, 'string');
    });

    it('constructor should save username as \'bang\'', () => {
      assert.equal(player.name, 'bang');
    });

    it('constructor should save hp as an int', () => {
      assert.typeOf(player.name, 'bang');
    });
  });
});

//const app = require('./server');
// const sayHello = require('./server').sayHello;
// const addNumbers = require('./server').addNumbers;

// describe('App', () => {
//   it('sayHello should return hellos', () => {
//     let result = sayHello();
//     assert.equal(result, 'hellos');
//   });

//   it('sayHello should return type string', () => {
//     let result = sayHello();
//     assert.typeOf(result, 'string')
//   });

//   it('addNumbers should be greater than 5', () => {
//     let result = addNumbers(-1, 5);
//     assert.isAbove(result, 5);
//   });
// });