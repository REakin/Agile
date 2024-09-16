//building the game sort of...
const e = React.createElement;

class continueScreen extends React.Component{
    removeMessage(){
        let element = document.getElementById('messageArea');
        ReactDOM.unmountComponentAtNode(element);
        window.enemy = new Enemy(100+(10*rdnum),5,1000)

    }
    render(){
        return(
            <div id={'message'}>
                <div>would you like to continue?</div>
                <button onClick={player.endgame}>No</button>
                <button onClick={this.removeMessage}>Yes</button>
            </div>
        )
    }
}



class game extends React.Component{
    constructor(props){
        super(props);
        this.state ={
            maxhp: window.player.maxhp,
            playerhp: window.player.hp,
            gold: window.player.gold,
            ehp: window.enemy.hp,
            kills: window.rdnum
        }

    }
    update(){
        try{
        this.setState({
            maxhp: window.player.maxhp,
            playerhp: window.player.hp,
            gold: window.player.gold,
            ehp: window.enemy.hp,
            eav: window.enemy.av,
            rdnum: window.rdnum
        })}
        catch(e) {
        }
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
                <div>Enemy av: {this.state.eav}</div>
                <div>Round Number: {this.state.rdnum}</div>
                <button onClick={window.player.ability1.bind(window.player)}>use ability1</button>
                <button onClick={window.player.attack.bind(window.player)}>ATTACK!</button>
            </div>
        )
    }
}

class gameover extends React.Component{
    constructor(props){
        super(props);
        try{this.state = {
            gold: player.gold,
            av: player.av}}
        catch(e){this.state ={
            gold:0,
            av:5}}
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
                <h1>Welcome to the village</h1>
                <div>Your gold: {this.state.gold}</div>
                <div onClick={this.upgrade.bind(this)}>Upgrade Weapon cost:10 gold</div>
                <div>current attack power: {this.state.av}</div>
                <button onClick={hirefollower}>Hire a follower</button>
                <button onClick={this.restart}>Enter the dungeon</button>
            </div>
        )
    }
}

class start_screen extends React.Component{
    render(){
        return(
            <button onClick={start}>Click here to start!</button>
        )
    }
}
class escapeMessage extends React.Component{

    removeMessage(){
        let element = document.getElementById('messageArea');
        ReactDOM.unmountComponentAtNode(element);
    }
    render(){
        return(
            <div>
                <div>You escaped the dungeon with {player.gold} gold</div>
                <div>You killed {rdnum} monsters</div>
                <button onClick={this.removeMessage}>Close message</button>
            </div>
        )
    }
}
class deathMessage extends React.Component{
    removeMessage(){
        let element = document.getElementById('messageArea');
        ReactDOM.unmountComponentAtNode(element);
    }
    render(){
        return(
            <div>
                <div>You died in the dungeon with {player.gold}</div>
                <div>You killed {rdnum} monsters before dying</div>
                <button onClick={this.removeMessage}>Close message</button>
            </div>
        )
    }
}

function hirefollower(){
    window.follower = new autochar('name', 1, 1000)
}

function start(){
    //this will be turned into a AJAX call
    let gold = 0;
    let av = 5;
    window.player = new Player('Coo15', 100, gold, av);
    ReactDOM.render(e(gameover),document.getElementById('root'))
}


function createGame(){
    ReactDOM.unmountComponentAtNode(document.getElementById('messageArea'));
    window.rdnum = 1;
    window.player.hp = player.maxhp;
    window.enemy = new Enemy(100+(10*rdnum),5,1000);
    ReactDOM.render(e(game),document.getElementById('root'));
}

ReactDOM.render(e(start_screen),document.getElementById('root'));
