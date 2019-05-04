// const React = require("react");
// const ReactDOM = require("react-dom");

class Player {
    //This will be the actual button that the user clicks on :)
    constructor(username, maxhp, gold, av) {
        this.name = username;
        this.maxhp = parseInt(maxhp);
        this.hp = parseInt(maxhp);
        this.gold = parseInt(gold);
        this.av = parseInt(av);
        this.bonusav = 0
    }

    attack() {
        if (this.hp > 0) {
            //console.log('i attacked');
            enemy.takedamage(this.av + this.bonusav);
        }
    }

    takedamage(damage) {
        this.hp -= damage;
        //playerhealth.innerHTML = this.hp;
        if (this.hp <= 0) {
            this.die()
        }
    }
    ability1() {
        this.bonusav += 5;
        setTimeout(function () {
            player.bonusav -= 5;
        }, 2000)
    }
    die() {
        clearInterval(enemy.attackint);
        ReactDOM.render(e(village), document.getElementById('root'),function () {
            ReactDOM.render(e(deathMessage), ReactDOM.findDOMNode(document.getElementById("popupArea")))
        });
        player.gold = 0;
    }
}

class Enemy {
    constructor(hp, av, i) {
        this.maxhp = parseInt(hp);
        this.hp = parseInt(hp);
        this.av = parseInt(av);
        this.interval = parseInt(i);
        this.attackint = setInterval(this.attack.bind(this), this.interval)
    }

    attack() {
        player.takedamage(this.av)
    }

    takedamage(damage) {
        console.log('test');
        this.hp -= damage;
        if (this.hp <= 0) {
            this.die()
        }
    }

    die() {
        window.player.gold += this.av;
        window.kills +=1;
        console.log(kills);
        clearInterval(this.attackint);
        if (window.kills % 5 === 0) {
            window.rdnum += 1;
            delete window.enemy;
            ReactDOM.render(e(continueScreen), ReactDOM.findDOMNode(document.getElementById('messageArea')));
        } else {
            delete window.enemy;
            window.enemy = new Enemy(100 + (10 * rdnum), 5, 1000)
        }
    }
}

class Autochar {
    constructor(name, av, interval) {
        this.name = name;
        this.av = av;
        this.interval = parseInt(interval);
    }
    upgrade() {
        if (player.gold >= 10) {
            this.av += 5
        }
    }
    attack() {
        if (player.hp > 0) {
            enemy.takedamage(this.av);
        }
    }
    startint() {
        setInterval(this.attack.bind(this), this.interval)
    }
}
/*
This is for unit testing
module.exports = {
    Player,
    Enemy,
    Autochar
}*/
