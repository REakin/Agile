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
/*
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
        this.setState({hp: player.hp});
        this.forceUpdate()
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
        this.state = {gold: player.gold};
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
}*/

function createGame(){
    window.enemyhp = document.getElementById('enemy_health');
    window.player = new Player('GAYGAY', 100, 0, 10);
    window.enemy = new Enemy(100,10,1000);
    ReactDOM.render(e(test),document.getElementById('root'));
};


class test extends React.Component{
    render(){
        return(
            <div className="test">
                <h1>player area</h1>
                <div>health: {window.player.hp}</div>
                <div>gold: {window.player.gold}</div>
            </div>
        )
    }
}
