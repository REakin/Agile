import React from "react";
import ReactDOM from "react-dom";

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
        //alert('You have died!');
        ReactDOM.render(e(gameover),document.getElementById('root'));
        window.av = player.av;
        delete window.player;
    }
}

class Enemy{
    constructor(hp,av,i,){
        this.maxhp = parseInt(hp)
        this.hp = parseInt(hp);
        this.av = parseInt(av);
        this.interval = i;
        this.attackint = setInterval(this.attack.bind(this),this.interval)
    }

    attack(){
        player.takedamage(this.av)
    }

    takedamage(damage){
        this.hp -= damage;
        if(this.hp <= 0){
            this.die()
        }
    }

    die(){
        window.player.gold += this.av;
        clearInterval(this.attackint);
        var old_hp = this.maxhp;
        delete window.enemy;
        window.enemy = new Enemy(old_hp+10,5,1000)
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

class test extends React.Component{
    constructor(props){
        super(props);
        this.state ={
            maxhp: window.player.maxhp,
            playerhp: window.player.hp,
            gold: window.player.gold,
            ehp: window.enemy.hp
        }
    }
    update(){
        //console.log('test');
        this.setState({
            maxhp: window.player.maxhp,
            playerhp: window.player.hp,
            gold: window.player.gold,
            ehp: window.enemy.hp
        })
    }
    componentDidMount(){
        this.interval = setInterval(this.update.bind(this),100)
    }
    componentWillUnmount(){
        clearInterval(this.interval)
    }
    render(){
        return(
            <div className="test">
                <h1>Player Area</h1>
                <div>health: {this.state.playerhp+'/'+this.state.maxhp}</div>
                <div>gold: {this.state.gold}</div>
                <h1>Enemy Area</h1>
                <div>Enemy hp: {this.state.ehp}</div>
                <button onClick={window.player.attack.bind(window.player)}>ATTACK!</button>
            </div>
        )
    }
}
class gameover extends React.Component{
    constructor(props){
        super(props);
        try{
        this.state = {
            gold: player.gold,
            av: player.av
            }
        }
        catch(e){
            this.state ={
                gold:0,
                av:5
            }
        }
    }
    upgrade(){
        if(this.state.gold>=10){
            this.setState({
                gold: this.state.gold-10,
                av: this.state.av+2
            });
        }
    }
    render(){
        this.restart = createGame.bind(this, this.state.gold,this.state.av);

        return(
            <div>
                <h1>Welcome to the village area place</h1>
                <div>gold: {this.state.gold}</div>
                <div onClick={this.upgrade.bind(this)}>Upgrade: 10 gold</div>
                <div>current attack power: {this.state.av}</div>
                <button onClick={this.restart}>Play Again</button>
            </div>
        )
    }
}

function createGame(gold, av){
    window.player = new Player('GAY-GANG', 100, gold, av);
    window.enemy = new Enemy(100,10,1000);
    ReactDOM.render(e(test),document.getElementById('root'));
}

class start_screen extends React.Component{
    render(){
        return(
        <button onClick={start}>Click here to start!</button>
        )
    }

}
ReactDOM.render(e(start_screen),document.getElementById('root'));

function start(){
    ReactDOM.render(e(gameover),document.getElementById('root'))
}