class Player{
    //This will be the actual button that the user clicks on :)
    constructor(username, maxhp, gold, av){
        this.name = username;
        this.maxhp = parseInt(maxhp);
        this.hp = parseInt(maxhp);
        this.gold = parseInt(gold);
        this.av = parseInt(av)
    }

    attack(){
        if  (this.hp > 0) {
            console.log('i attacked');
            enemy.takedamage(this.av)
        }
    }

    takedamage(damage){
        this.hp -= damage;
        //playerhealth.innerHTML = this.hp;
        if(this.hp <= 0){
            this.die()
        }
    }

    die(){
        clearInterval(enemy.attackint);
        alert('You have died!');
        delete window.player;
    }
}


/*class AutoClicker{
    //This will be the automated clickers
    constructor(lvl,price,name,value,interval){
        this.lvl = lvl;
        this.value = value;
        this.price = price;
        this.nextPrice = price*((1+this.lvl)*30);
        this.interval = interval;

        this.area = document.createElement("div");
        this.area.id = name+'autoclick';
        this.area.onclick = this.lvlUp.bind(this);

        this.lvldisplay = document.createElement("div");
        this.lvldisplay.id = name+'lvl';

        this.pricedisplay = document.createElement("div");
        this.pricedisplay.id = name+"displayprice";

        this.button = document.createElement("button");
        this.button.innerHTML = name+"LvlUp";

        this.area.append(document.createTextNode(name+" Level:"));
        this.area.append(this.lvldisplay);

        this.area.append(document.createTextNode(name+" LvlUp Price: "));
        this.area.append(this.pricedisplay);
        this.area.append(document.createElement("hr"));
        autoclickarea.append(this.area);

        this.sender();
        this.autoclicker = setInterval(this.click.bind(this), this.interval/this.lvl)
    }

    click(){
        if(this.lvl >= 1){
            window.clicks += this.value;
            window.total_clicks += this.value;
            this.display();
        }
    }

    lvlUp(){
        if(window.clicks >= this.nextPrice) {
            window.clicks -= this.nextPrice;
            this.lvl += 1;
            this.nextPrice = this.price*(this.lvl*30);
            clearInterval(this.autoclicker);
            this.interval = this.interval/this.lvl;
            this.autoclicker = setInterval(this.click.bind(this), this.interval);
            this.sender();
        }
    }
    sender(){
        this.lvldisplay.innerHTML = this.lvl;
        this.pricedisplay.innerHTML = this.nextPrice;
        this.display()

    }
    display(){
        numclicks.innerHTML = clicks;
        totalclicks.innerHTML= total_clicks;
    }

    getlvl(){
        return this.lvl
    }
}*/

class Enemy{
    constructor(hp,av,i,){
        this.hp = parseInt(hp);
        enemyhp.innerHTML = this.hp;
        this.av = parseInt(av);
        this.interval = i;
        this.attackint = setInterval(this.attack.bind(this),this.interval)
    }

    attack(){
        player.takedamage(this.av)
    }

    takedamage(damage){
        this.hp -= damage;
        enemyhp.innerHTML = this.hp;
        if(this.hp <= 0){
            this.die()
        }
    }

    die(){
        window.player.gold += this.av;
        pgold.update();
        clearInterval(this.attackint);
        var old_attack = this.av;
        delete window.enemy;
        window.enemy = new Enemy(100,old_attack+2,1000)
    }
}

//building the game sort of...
const e = React.createElement;

class name extends React.Component{
    render(){
        return e(
            'div',
            {id:'name'},
            player.name
        )
    }
}
class health extends React.Component{
    constructor(props){
        super(props);
        this.state = {hp: player.hp}
    }
    componentDidMount(){
        this.timerID = setInterval(()=>
            this.tick(),500
        );
    }
    componentWillUnmount(){
        clearInterval(this.timerID)
    }
    tick(){
        this.setState({hp: player.hp})
    }
    render(){
        return e(
            'div',
            {id:'health'},
            player.hp+'/'+player.maxhp
        )
    }
}
class gold extends React.Component{
    constructor(props){
        super(props);
        this.state = {gold: player.gold}
    }

    render(){
        return e(
            'div',
            {id:'gold'},
            'Gold:'+player.gold
        )
    }
}

class AttackButton extends React.Component {
    render() {
        return e(
            'button',
            {onClick: player.attack.bind(window.player), id: 'attackButton'},
            'Attack'
        );
    }
}

class game extends React.Component{
    render(){
        return e(
            'div',
            {id:'game'},
            e(AttackButton),
            e(name),
            e(gold),
            e(health)
        )
    }
}
function createGame(){
    window.enemyhp = document.getElementById('enemy_health');
    window.player = new Player('GAYGAY', 100, 0, 10);
    window.enemy = new Enemy(100,10,1000);
    ReactDOM.render(e(game), document.getElementById('root'));

}

/*ReactDOM.render(e(AttackButton), document.getElementById('button'));
ReactDOM.render(e(name),document.getElementById('player_name'));
ReactDOM.render(e(health),document.getElementById('player_health'));
ReactDOM.render(e(gold),document.getElementById('player_gold'));*/
