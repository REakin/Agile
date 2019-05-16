class Player {
    //This will be the actual button that the user clicks on :)
    constructor(username, maxhp, gold, av) {
        this.name = username;
        this.maxhp = parseInt(maxhp);
        this.hp = parseInt(maxhp);
        this.gold = parseInt(gold);
        this.av = parseInt(av);
        this.followers = {};
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

    attack(target,container) {
        //console.log(target);
        if (this.hp > 0) {
            //console.log(target);
            target.takedamage(this.av,this,container);
        }
    }
    takedamage(damage,enemy) {
        this.hp -= damage;
        enemy.container.Stateupdate();
        if (this.hp <= 0) {
            this.die(enemy)
        }
    }
    heal(heal){
        this.hp += heal;
        if(this.hp >= this.maxhp){
            this.hp = this.maxhp
        }
    }
    die(enemy) {
        this.gold = 0;
        clearInterval(enemy.attackint);
        for (let follower in this.followers){
            this.followers[follower].teardown()
        }
        // ReactDOM.render(e(Village), document.getElementById('root'),function () {
        //     ReactDOM.render(e(DeathMessage), ReactDOM.findDOMNode(document.getElementById("popupArea")))
        //});
    }
}

class Enemy {
    constructor(hp, av, i, container) {
        this.maxhp = parseInt(hp);
        this.hp = parseInt(hp);
        this.av = parseInt(av);
        this.interval = parseInt(i);
        this.container = container
    }
    startinterval(player){
        this.attackint = setInterval(this.attack.bind(this,player), this.interval)
    }

    attack(target) {
        target.takedamage(this.av,this);
        this.container.Stateupdate()
    }

    takedamage(damage,player) {
        this.hp -= damage;
        this.container.Stateupdate();
        if (this.hp <= 0) {
            this.die(player)
        }
    }
    die(player) {
        player.gold += 1;
        this.container.setState({kills:this.container.state.kills+1});
        clearInterval(this.attackint);
        this.container.Stateupdate();
        if (this.container.state.kills % 5 === 0) {
            for (let follower in player.followers){
                player.followers[follower].teardown()
            }
            this.container.setState({rdnum:this.container.state.rdnum+1});
            console.log('continue?');
            ReactDOM.render(<ContinueScreen Container={this.container} ChangeVillage={this.container.props.changeVillage.bind(this.container)}/>, ReactDOM.findDOMNode(document.getElementById('messageArea')));
        } else {
            this.hp = (this.maxhp+=10);
            this.startinterval(player);
            this.container.Stateupdate();
        }
    }
}

class AutoWarrior {
    constructor(name, lvl, interval,) {
        this.name = name;
        this.interval =interval;
        this.lvl = lvl
    }
    attack() {
        if (player.hp > 0) {
            enemy.takedamage(this.lvl);
        }
    }
    action() {
        this.actiontime = setInterval(this.attack.bind(this), this.interval)
    }
    teardown(){
        clearInterval(this.actiontime)
    }
}

class AutoDruid{
    constructor(name, lvl, interval) {
        this.name = name;
        this.interval =interval;
        this.lvl = lvl
    }
    healplayer(){
        player.heal(this.lvl)
    }
    action(){
        this.actiontime = setInterval(this.healplayer.bind(this), this.interval)
    }
    teardown(){
        clearInterval(this.actiontime)
    }
}

class AutoThief{
    constructor(name, lvl, interval) {
        this.name = name;
        this.interval =interval;
        this.lvl = lvl;
    }
    findgold(){
        player.gold += this.lvl
    }
    action() {
       this.actiontime = setInterval(this.findgold.bind(this), this.interval)
    }
    teardown(){
        clearInterval(this.actiontime)
    }
}

class AutoCleric{
    constructor(name,lvl) {
        this.name = name;
        this.lvl = lvl
    }
    action() {
        enemy.interval += this.lvl*1000
    }
    teardown(){
        //pass
    }
}


//This is for unit testing
/*
module.exports = {
    Player,
    Enemy,
    Autochar
}*/
