//building the game sort of...
const e = React.createElement;

class continueScreen extends React.Component{
    removeMessage(){
        let element = document.getElementById('messageArea');
        ReactDOM.unmountComponentAtNode(element);
        window.enemy = new Enemy(100+(10*rdnum),5,1000)
    }
    escape(){
        ReactDOM.render(e(village), document.getElementById('root'),function () {
            ReactDOM.render(e(escapeMessage), ReactDOM.findDOMNode(document.getElementById("popupArea")));
        });

    }
    render(){
        return(
            <div id={'message'}>
                <br/>
                <div>would you like to continue?</div>
                <div>WARNING <br/> If you die then you lose all of your gold!</div>
                <button onClick={this.escape}>No</button>
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
            <div id={'gameArea'}>
                <h1>Player Area</h1>
                <div>health: {this.state.playerhp+'/'+this.state.maxhp}</div>
                <div>gold: {this.state.gold}</div>
                <h1>Enemy Area</h1>
                <div>Enemy hp: {this.state.ehp}</div>
                <div>Enemy av: {this.state.eav}</div>
                <div>Round Number: {this.state.rdnum}</div>
                <button onClick={window.player.ability1.bind(window.player)}>use ability1</button>
                <button onClick={window.player.attack.bind(window.player)}>ATTACK!</button>
                <div id={'messageArea'}/>
            </div>
        )
    }
}

class village extends React.Component{
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
                gold: player.gold -10,
                av: player.av+2
            });
            player.gold -= 10;
            player.av += 2;
        }
    }
    openFollowerShop(){
        ReactDOM.render(e(FollowerShop),document.getElementById("popupArea"))
    }
    render(){
        this.restart = createGame.bind(this);
        return(
            <div id={'gameArea'}>
                <div id={'popupArea'}/>
                <h1>Welcome to the village</h1>
                <div>Your gold: {this.state.gold}</div>
                <div onClick={this.upgrade.bind(this)}>Upgrade Weapon cost:10 gold</div>
                <div>current attack power: {this.state.av}</div>
                <button onClick={this.openFollowerShop}>Open Follower Shop</button>
                <button onClick={this.restart}>Enter the dungeon</button>
            </div>
        )
    }
}

class start_screen extends React.Component{
    render(){
        return(
            <div id={'gameArea'}>
                <button onClick={start}>Click here to start!</button>
                <div id={'popupArea'}/>
            </div>
        )
    }
}
class escapeMessage extends React.Component{
    removeMessage(){
        ReactDOM.unmountComponentAtNode(document.getElementById("popupArea"));
    }
    render(){
        return(
            <div id={'message'}>
                <div>You escaped the dungeon with {player.gold} gold</div>
                <div>You killed {kills} monsters</div>
                <button onClick={this.removeMessage}>Close message</button>
            </div>
        )
    }
}
class deathMessage extends React.Component{
    removeMessage(){
        ReactDOM.unmountComponentAtNode(document.getElementById("popupArea"));
    }
    render(){
        return(
            <div id={'message'}>
                <div>You died in the dungeon</div>
                <div>you lost {player.gold} gold</div>
                <div>You killed {kills} monsters before dying</div>
                <button onClick={this.removeMessage}>Close message</button>
            </div>
        )
    }
}

class FollowerShop extends React.Component{
    removeMessage(){
        ReactDOM.unmountComponentAtNode(document.getElementById("popupArea"));
    }
    render(){
        return(
            <div id={'message'}>
                <div>Welcome to the shop!</div>
                <div id={'followertext'}>Hire a Warrior</div>
                <button id={'followerbutton'} onClick={hirefollower.bind(this,AutoWarrior,'Warrior',1,1000)}>HIRE</button>
                <div id={'followertext'}>Hire a Druid</div>
                <button id={'followerbutton'} onClick={hirefollower.bind(this,AutoDruid,'Druid',2,1500)}>HIRE</button>
                <div id={'followertext'}>Hire a Thief</div>
                <button id={'followerbutton'} onClick={hirefollower.bind(this,AutoThief,'Thief',1,1000)}>HIRE</button>
                <div id={'followertext'}>Hire a Cleric</div>
                <button id={'followerbutton'} onClick={hirefollower.bind(this,AutoCleric,'Cleric',1000,1000)}>HIRE</button>
                <button onClick={this.removeMessage}>Close Shop</button>
            </div>
        )
    }
}

ReactDOM.render(e(start_screen),document.getElementById('root'));

function hirefollower(type, name,av,interaval){
    if(Object.keys(player.followers).length < 3){
        let follower = new type(name,av,interaval);
        player.followers[name] = follower
    }else{
        console.log("can't have more then tree followers")
    }
}

function start(){
    //this will be turned into a AJAX call
    let gold = 0;
    let av = 5;
    window.player = new Player('Coo15', 100, gold, av);
    ReactDOM.render(e(village),document.getElementById('root'))
}


function createGame(){
    window.kills = 0;
    window.rdnum = 1;
    window.player.hp = player.maxhp;
    window.enemy = new Enemy(40+(10*rdnum),5,1000);
    for(let follower in player.followers){
        player.followers[follower].action()
    }
    window.enemy.startinterval();
    ReactDOM.render(e(game),document.getElementById('root'));
}