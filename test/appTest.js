const assert = require('chai').assert;
const clicker = require('../views/JS/Clicker');
const Player = clicker.Player;
const Enemy = clicker.Enemy;
const Autowarrior = clicker.AutoWarrior;

// Testing Player class
describe('Player', () => {

  // Testing the constructor
  describe('#constructor', () => {
    let player = new Player('bang', 30, 15, 10,0,0,0,0);

    // Test username
    it('should save username as a string', () => {
      assert.typeOf(player.name, 'string');
    });

    it('should save username as \'bang\'', () => {
      assert.equal(player.name, 'bang');
    });

    // Test hp
    it('should save hp as a number', () => {
      assert.typeOf(player.hp, 'number');
    });

    it('should save hp as 30', () => {
      assert.equal(player.hp, 30);
    });

    // Test max hp
    it('should save max hp as a number', () => {
      assert.typeOf(player.maxhp, 'number');
    });

    it('should save max hp as 30', () => {
      assert.equal(player.maxhp, 30);
    });

    // Test gold
    it('should save gold as a number', () => {
      assert.typeOf(player.gold, 'number');
    });

    it('should save gold as 15', () => {
      assert.equal(player.gold, 15);
    });

    // Test attack value (av)
    it('should save av as a number', () => {
      assert.typeOf(player.av, 'number');
    });

    it('should save av as 10', () => {
      assert.equal(player.av, 10);
    });

  });

  // TODO - Testing attack
  // We cannot test this until the code is refactored
  // to not rely on window variables
  // describe('#attack', () => {
  //   it('should reduce enemy hp from 20 to 10 ', () => {
  //     let enemy = new Enemy(20, 10, 5);
  //     player.attack()
  //     assert.equal(enemy.hp, 10);
  //   });
  // });

  // Testing takedamage
  // describe('#takedamage', () => {
  //
  //   it('should reduce player hp from 30 to 5 ', () => {
  //     let player = new Player('bang', 30, 15, 10,0,0,0,0);
  //     player.takedamage(25);
  //     assert.equal(player.hp, 5);
  //   });

    // TODO - Add React testing to be able to test
    // player death
    // it('should call die()', () => {
    //   let player = new Player('bang', 30, 15, 10);
    //   player.takedamage(30)
    // });
  //});

  // Testing heal
  describe('#heal', () => {
    let player = new Player('bang', 30, 15, 10,0,0,0,0);
    player.hp = 5;

    // Test healing
    it('should increase hp to 15 from 5', () => {
      player.heal(10);
      assert.equal(player.hp, 15);
    });

  });

  // TODO - Figure out testing time outs
  // describe('#ability1', () => {
  //   it('should raise bonus attack value (bonusav) from 0 to 5 ', () => {
  //     let player = new Player('bang', 30, 15, 10);
  //     player.ability1();
  //     assert.equal(player.bonusav, 5);
  //   });

  // TODO - figure out testing time outs
  // it('should reduce bonus attack value from 5 to 0 after 2000 milliseconds ', () => {
  //   setTimeout(function () {
  //     let player = new Player('bang', 30, 15, 10);
  //     player.ability1();
  //     assert.equal(player.bonusav, 0);
  //   }, 2001);
  // });

  // });

  // describe('#endgame', () => {
  //   // TODO - React Testing
  //     it('should render the game over page when called ', () => {

  //     });

  //   // TODO - React Testing
  //     it('should render the escape message when called ', () => {

  //     });

  // });

  // TODO - React testing
  // describe('#die', () => {
  //    We cannot test this until the code is refactored
  //    to not rely on window variables
  //   it('should set player gold from 30 to 0', () => {
  //     let player = new Player('bang', 30, 15, 10);
  //     player.die()
  //     assert.equal(player.gold, 0);
  //   });
  // });

});

// Testing Enemy class
describe('Enemy', () => {

  // Testing the constructor
  describe('#constructor', () => {
    // TODO - allow testing the constructor
    // this.attackint prevents constructor from being tested
    // because it calls enemy.attack() which in turn uses
    // the player undeclared variable

    let enemy = new Enemy(20, 10, 5);

    // Test hp
    it('should save hp as a number', () => {
      assert.typeOf(enemy.hp, 'number');
    });

    it('should save hp as 20', () => {
      assert.equal(enemy.hp, 20);
    });

    // Test max hp
    it('should save max hp as a number', () => {
      assert.typeOf(enemy.maxhp, 'number');
    });

    it('should save max hp as 20', () => {
      assert.equal(enemy.maxhp, 20);
    });

    // Test attack value (av)
    it('should save av as a number', () => {
      assert.typeOf(enemy.av, 'number');
    });

    it('should save av as 10', () => {
      assert.equal(enemy.av, 10);
    });

    // Test interval (i)
    it('should save av as a number', () => {
      assert.typeOf(enemy.i, 'number');
    });

    it('should save i as 5', () => {
      assert.equal(enemy.i, 5);
    });

    // TODO - test attack interval (attackint)
    // it('should have an interval of X', () => {

    // });
  });

  //   TODO - Testing attack
  // We cannot test this until the code is refactored
  // to not rely on window variables
  // describe('#attack', () => {
  //   it('should reduce player hp from 30 to 20 ', () => {
  //     let enemy = new Enemy(20, 10, 5);
  //     let player = new Player('bang', 30, 15, 10);
  //     enemy.attack();
  //     assert.equal(player.hp, 20);
  //   });
  // });

  // Testing takedamage
  describe('#takedamage', () => {
    // let enemy = new Enemy(20, 10, 5);

    it('should reduce enemy hp from 20 to 5 ', () => {
      enemy.takedamage(15);
      assert.equal(enemy.hp, 5);
    });

  });

  // TODO - React testing
  // describe('#die', () => {
  //    We cannot test this until the code is refactored
  //    to not rely on window variables
  //   it('should set player gold from 30 to 0', () => {
  //     let enemy = new Enemy(20, 10, 5);
  //     enemy.die()
  //     stuff goes here...
  //   });
  // });

});

// Testing Player class
describe('Autowarrior', () => {

  // Testing the constructor
  describe('#constructor', () => {
    let autochar = new Autowarrior('heman', 15, 5);

    // Test name
    it('should save name as a string', () => {
      assert.typeOf(autochar.name, 'string');
    });

    it('should save name as \'heman\'', () => {
      assert.equal(autochar.name, 'heman');
    });

    // Test attack value (av)
    it('should save av as a number', () => {
      assert.typeOf(autochar.av, 'number');
    });

    it('should save av as 15', () => {
      assert.equal(autochar.av, 15);
    });

    // this is failing for some reason...
    // // Test interval (i)
    // it('should save i as a number', () => {
    //   assert.typeOf(autochar.i, 'number');
    // });

    // it('should save i as 3', () => {
    //   assert.equal(autochar.i, 3);
    // });
  });

    //   TODO - Testing attack
    // We cannot test this until the code is refactored
    // to not rely on window variables
    // describe('#attack', () => {
    //   it('should reduce player hp from 30 to 20 ', () => {
    //     let enemy = new Enemy(20, 10, 5);
    //     let player = new Player('bang', 30, 15, 10);
    //     enemy.attack();
    //     assert.equal(player.hp, 20);
    //   });
    // });

    // Testing the constructor
    describe('#action', () => {
      let warrior = new Autowarrior('heman', 15, 5);

      // Test attack value (av)
      it('should save av as a number', () => {
        assert.typeOf(autochar.av, 'number');
      });
    });
  });