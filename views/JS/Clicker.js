class Player {
    //This will be the actual button that the user clicks on :)
    constructor(username, maxhp, gold, av) {
        this.name = username;
        this.maxhp = parseInt(maxhp);
        this.hp = parseInt(maxhp);
        this.gold = parseInt(gold);
        this.av = parseInt(av);
        this.bonusav = 0;
        this.followers = {}
    }
    upgradeAV(){
        if(this.gold>=10+(this.av*2)){
            player.gold -= 10+(this.av*2);
            player.av += 5;
            console.log('upgraded')
        }
    }
    upgradeHP(){
        if(this.gold>=20+this.maxhp){
            this.gold -= 20+this.maxhp;
            this.maxhp += 10;
            console.log('upgraded')
        }
    }

    attack() {
        if (this.hp > 0) {
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
    heal(heal){
        player.hp += heal
        if(player.hp >= player.maxhp){
            player.hp = player.maxhp
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
    }
    startinterval(){
        this.attackint = setInterval(this.attack.bind(this), this.interval)
    }

    attack() {
        player.takedamage(this.av)
    }

    takedamage(damage) {
        this.hp -= damage;
        if (this.hp <= 0) {
            this.die()
        }
    }

    die() {
        window.player.gold += 1 + window.rdnum;
        window.kills += 1;
        console.log(kills);
        clearInterval(this.attackint);
        if (window.kills % 5 === 0) {
            window.rdnum += 1;
            delete window.enemy;
            ReactDOM.render(e(continueScreen), ReactDOM.findDOMNode(document.getElementById('messageArea')));
        } else {
            delete window.enemy;
            window.enemy = new Enemy(40 + (10 * rdnum), 5, 1000)
            window.enemy.startinterval()
        }
    }
}

class AutoWarrior {
    constructor(name, av, interval) {
        this.name = name;
        this.av = av;
        this.interval =interval;
    }
    attack() {
        if (player.hp > 0) {
            enemy.takedamage(this.av);
        }
    }
    action() {
        setInterval(this.attack.bind(this), this.interval)
    }
}
class AutoDruid{
    constructor(name, heal, interval) {
        this.name = name;
        this.heal = heal;
        this.interval =interval;
    }
    healplayer(){
        player.heal(this.heal)
    }
    action(){
        setInterval(this.healplayer.bind(this), this.interval)
    }
}
class AutoThief{
    constructor(name, bonus, interval) {
        this.name = name;
        this.bonus = bonus
        this.interval =interval;
    }
    findgold(){
        player.gold += this.bonus
    }
    action() {
        setInterval(this.findgold.bind(this), this.interval)
    }
}
class AutoCleric{
    constructor(name, debuff) {
        this.name = name;
        this.debuff = debuff
    }
    action() {
        enemy.interval += this.debuff
    }
}

/*
This is for unit testing
module.exports = {
    Player,
    Enemy,
    Autochar
}*/