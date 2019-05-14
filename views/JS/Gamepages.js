//building the game sort of...
const e = React.createElement;

class Game extends React.Component{
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

class Village extends React.Component{
    constructor(props){
        super(props);
        try{this.state = {
            gold: player.gold,
            av: player.av}}
        catch(e){this.state ={
            gold:0,
            av:5}}
    }
    openFollowerShop(){
        ReactDOM.render(e(FollowerShop),document.getElementById("popupArea"))
    }
    openPlayerShop(){
        ReactDOM.render(e(PlayerShop),document.getElementById("popupArea"))
    }
    render(){
        this.restart = createGame.bind(this);
        return(
            <div id={'gameArea'}>
                <div id={'popupArea'}/>
                <h1>Welcome to the village</h1>
                <div>Your gold: {this.state.gold}</div>
                <button onClick={this.openFollowerShop}>Open Follower Shop</button>
                <button onClick={this.openPlayerShop}>Open Player Shop</button>
                <button onClick={this.restart}>Enter the dungeon</button>
            </div>
        )
    }
}

class Start_screen extends React.Component{
    render(){
        return(
            <div id={'gameArea'}>
                <button onClick={getStats}>Click here to start!</button>
                <div id={'popupArea'}/>
            </div>
        )
    }
}

class EscapeMessage extends React.Component{
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

class DeathMessage extends React.Component{
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
    constructor(props){
        super(props);
        this.state={
            'warrior': false,
            'wlvl':1,
            'druid': false,
            'dlvl':1,
            'thief': false,
            'tlvl':1,
            'cleric': false,
            'clvl':1
        };
        this.checkhired()
    }
    hirefollower(type, name, lvl, interaval){
        if(Object.keys(player.followers).length < 3){
            let follower = new type(name,lvl,interaval);
            player.followers[name] = follower;
            this.checkhired()
        }else{
            console.log("can't have more then tree followers")
        }
    }

    fireFollower(name){
        delete player.followers[name];
        this.checkhired()
    }
    upgradeFollower(type,lvl){
        if (player.gold>= 20*lvl){
            player.gold -= 20*lvl;
            this.setState({[type]:lvl+1})
        }
    }

    checkhired(){
        if('Warrior' in player.followers){
            this.setState({'warrior':true});
            this.buttonW = <div><button id={'followerbuttonW'} onClick={this.fireFollower.bind(this,'Warrior')}>FIRE</button></div>
        }
        else{
            this.setState({'warrior': false});
            this.buttonW = <div>
                    <button id={'upgradefollowerW'} onClick={this.upgradeFollower.bind(this,'wlvl',this.state.wlvl)}>Upgrade Warrior</button>
                    <button id={'followerbuttonW'} onClick={this.hirefollower.bind(this,AutoWarrior,'Warrior',this.state.wlvl,1000)}>HIRE</button>
                </div>
        }
        if('Druid' in player.followers){
            this.setState({'druid':true});
            this.buttonD = <div><button id={'followerbuttonD'} onClick={this.fireFollower.bind(this,'Druid')}>FIRE</button></div>
        }else {
            this.setState({'druid': false});
            this.buttonD = <div>
                <button id={'upgradefollowerD'} onClick={this.upgradeFollower.bind(this, 'dlvl', this.state.dlvl)}>Upgrade Druid</button>
                <button id={'followerbuttonD'} onClick={this.hirefollower.bind(this, AutoDruid, 'Druid', this.state.dlvl, 1500)}>HIRE</button>
            </div>;
        }
        if('Thief' in player.followers){
            this.setState({'thief':true});
            this.buttonT = <div><button id={'followerbuttonT'} onClick={this.fireFollower.bind(this,'Thief')}>FIRE</button></div>
        }else {
            this.setState({'thief': false});
            this.buttonT = <div>
                <button id={'upgradefollowerT'} onClick={this.upgradeFollower.bind(this,'tlvl',this.state.tlvl)}>Upgrade Thief</button>
                <button id={'followerbuttonT'} onClick={this.hirefollower.bind(this,AutoThief,'Thief',this.state.tlvl,1000)}>HIRE</button>
            </div>
        }
        if('Cleric' in player.followers){
            this.setState({'cleric':true});
            this.buttonC = <div><button id={'followerbuttonC'} onClick={this.fireFollower.bind(this,'Cleric')}>FIRE</button></div>
        }else {
            this.setState({'cleric': false});
            this.buttonC = <div>
                <button id={'upgradefollowerC'} onClick={this.upgradeFollower.bind(this,'clvl',this.state.clvl)}>Upgrade Cleric</button>
                <button id={'followerbuttonC'} onClick={this.hirefollower.bind(this,AutoCleric,'Cleric',this.state.clvl,1000)}>HIRE</button>
            </div>
        }
    }

    removeMessage(){
        ReactDOM.unmountComponentAtNode(document.getElementById("popupArea"));
    }

    render(){
        return(
            <div id={'message'}>
                <div>Welcome to the shop!</div>
                <div id={'followertext'}>Hire a Warrior</div>
                {this.buttonW}
                <div id={'followertext'}>Hire a Druid</div>
                {this.buttonD}
                <div id={'followertext'}>Hire a Thief</div>
                {this.buttonT}
                <div id={'followertext'}>Hire a Cleric</div>
                {this.buttonC}
                <button onClick={this.removeMessage}>Close Shop</button>
            </div>
        )
    }
}

class PlayerShop extends React.Component{
    constructor(props){
        super(props);
        this.state={
            gold: player.gold,
            playerav: player.av,
            playermaxhp: player.maxhp,
            avcost: 10+player.av*2,
            hpcost: 20+player.maxhp
        }
    }
    removeMessage(){
        ReactDOM.unmountComponentAtNode(document.getElementById("popupArea"));
    }
    avupgrade(){
        player.upgradeAV();
        this.setState({
            gold: player.gold,
            playerav: player.av,
            playermaxhp: player.maxhp,
            avcost: 10+player.av*2,
            hpcost: 20+player.maxhp
        })
    }
    hpupgrade(){
        player.upgradeHP();
        this.setState({
            gold: player.gold,
            playerav: player.av,
            playermaxhp: player.maxhp
        })
    }
    render() {
        return (
            <div id={'message'}>
                <div>Welcome to the player Shop</div>
                <div>Your Gold: {this.state.gold}</div>
                <div>upgrade weapon</div>
                <div>Your current Av: {this.state.playerav}</div>
                <div>cost to upgrade av: {this.state.avcost}</div>
                <button onClick={this.avupgrade.bind(this)}>Upgrade</button>
                <div>upgrade Armour</div>
                <div>Your current MaxHp: {this.state.playermaxhp}</div>
                <div>cost to upgrade: {this.state.hpcost}</div>
                <button onClick={this.hpupgrade.bind(this)}>upgrade</button>
                <button onClick={this.removeMessage}>Close Window</button>
            </div>
        );
    }
}

class ContinueScreen extends React.Component{
    removeMessage(){
        let element = document.getElementById('messageArea');
        ReactDOM.unmountComponentAtNode(element);
        window.enemy = new Enemy(100+(10*rdnum),5,1000);
        for(let follower in player.followers){
            player.followers[follower].action()
        }
        enemy.startinterval()
    }
    escape(){
        ReactDOM.render(e(Village), document.getElementById('root'),function () {
            xhrsend();
            ReactDOM.render(e(EscapeMessage), ReactDOM.findDOMNode(document.getElementById("popupArea")));
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


function start(name,hp,gold,av){
    window.player = new Player(name, hp, gold, av);
    ReactDOM.render(React.createElement(Village),document.getElementById('root'))
}

function createGame() {
    window.kills = 0;
    window.rdnum = 1;
    window.player.hp = player.maxhp;
    window.enemy = new Enemy(40 + (10 * rdnum), 5, 1000);
    for (let follower in player.followers) {
        player.followers[follower].action()
    }
    window.enemy.startinterval();
    ReactDOM.render(React.createElement(Game), document.getElementById('root'));
}

ReactDOM.render(React.createElement(Start_screen),document.getElementById('root'));