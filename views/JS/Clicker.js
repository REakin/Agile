class Player {
    //This will be the actual button that the user clicks on :)
    constructor(username, maxhp, gold, av, Wlvl, Dlvl, Tlvl, Clvl) {
        this.name = username;
        this.maxhp = parseInt(maxhp);
        this.hp = parseInt(maxhp);
        this.gold = parseInt(gold);
        this.av = parseInt(av);
        this.Wlvl=Wlvl;
        this.Dlvl=Dlvl;
        this.Tlvl=Tlvl;
        this.Clvl=Clvl;
        this.followers = {};
    }
    SavePlayerStateAndRun(run){
        let Save= new XMLHttpRequest();
        Save.open('post',`/saveState`);
        Save.setRequestHeader('Content-Type','application/json');
        let data =
            {
                php:this.hp,
                pav:this.av,
                pgold:this.gold,
                name:this.name,
                Wlvl:this.Wlvl,
                Dlvl:this.Dlvl,
                Tlvl:this.Tlvl,
                Clvl:this.Clvl,
                PastRun:run
            };
        Save.send(JSON.stringify(data));
    }
    SavePlayerState(){
        let Save= new XMLHttpRequest();
        Save.open('post',`/saveState`);
        Save.setRequestHeader('Content-Type','application/json');
        let data =
            {
                php:this.hp,
                pav:this.av,
                pgold:this.gold,
                name:this.name,
                Wlvl:this.Wlvl,
                Dlvl:this.Dlvl,
                Tlvl:this.Tlvl,
                Clvl:this.Clvl
            };
        Save.send(JSON.stringify(data));
    }
    upgradeAV(){
        if(this.gold>=10+(this.av*2)){
            this.gold -= 10+(this.av*2);
            this.av += 5;
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
    attack(target) {
        //console.log(target);
        if (this.hp > 0) {
            //console.log(target);
            target.takedamage(this.av,this);
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
        clearInterval(enemy.attackint);
        for (let follower in this.followers){
            this.followers[follower].teardown()
        }
        enemy.container.props.changeVillage();
        ReactDOM.render(<DeathMessage player={this}/>, ReactDOM.findDOMNode(document.getElementById("popupArea")));
        this.gold = 0;
        this.hp = this.maxhp;
        this.SavePlayerStateAndRun([enemy.container.state.kills,enemy.container.state.rdnum,this.maxhp,this.av,this.name,'Died'])
    }
}

class Enemy {
    constructor(hp, av, i, container) {
        this.maxhp = parseInt(hp);
        this.hp = parseInt(hp);
        this.av = parseInt(av);
        this.interval = parseInt(i);
        this.container = container}

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
        let enemyphoto = Math.floor(Math.random()*14)+1;
        this.container.setState({kills:this.container.state.kills+1, enemyPhoto: enemyphoto});
        player.gold += this.container.state.rdnum;
        clearInterval(this.attackint);
        this.container.Stateupdate();
        if (this.container.state.kills % 5 === 0 && this.container.state.kills !== 0) {
            for (let follower in player.followers){
                player.followers[follower].teardown()
            }
            if(this.container.state.difficulty<3){
                this.container.setState({rdnum:this.container.state.rdnum+1, difficulty:this.container.state.difficulty+1 });
            }else{
                this.container.setState({rdnum:this.container.state.rdnum+1});
            }
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


/*This is for unit testing

module.exports = {
    Player,
    Enemy,
    AutoWarrior,
    AutoDruid,
    AutoCleric,
    AutoThief
};*/
