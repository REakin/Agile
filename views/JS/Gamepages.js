//building the game sort of...
const e = React.createElement;

class Game extends React.Component{
    constructor(props){
        super(props);
        let playerState = this.GetPlayerState();
        this.state={
            village:true,
            dungeon: false,
            player: this.GetPlayerState()
        }
    }
    GetPlayerState(){
        //Creates the player object from the Database...
        let getChar = new XMLHttpRequest();
        getChar.open("get",'/getState',false);
        getChar.send();
        let stats = JSON.parse(getChar.response);
        let playername = stats[0].name;
        let hp = stats[0].php;
        let gold = stats[0].pgold;
        let av = stats[0].pav;
        let wlvl = stats[0].Wlvl;
        let dlvl = stats[0].Dlvl;
        let tlvl = stats[0].Tlvl;
        let clvl = stats[0].Clvl;
        return new Player(playername,hp,gold,av,wlvl,dlvl,tlvl,clvl)
    }
    ChangeVillage(){
        console.log('change to village');
        this.setState({village:true,dungeon:false})
    }
    ChangeDungeon(){
        console.log('change to dungeon');
        this.setState({village:false,dungeon:true})
    }
    updatePlayer(newplayer){
        this.setState({player:newplayer})
    }
    render(){
        if (this.state.village==true){
        return(
            <Village player={this.state.player} changeDungeon={this.ChangeDungeon.bind(this)}/>
            )
        }
        if(this.state.dungeon==true){
            return(
                <Dungeon player={this.state.player} changeVillage={this.ChangeVillage.bind(this)}/>
            )
        }
    }
}

class Dungeon extends React.Component{
    constructor(props){
        super(props);
        this.enemy = this.createGame(this);
        this.state ={
            enemy: this.enemy,
            maxhp: this.props.player.maxhp,
            playerhp: this.props.player.hp,
            gold: this.props.player.gold,
            ehp: this.enemy.hp,
            kills: 0,
            rdnum: 0
        };
    }

    Stateupdate(){
        this.setState({
            enemy: this.enemy,
            maxhp: this.props.player.maxhp,
            playerhp: this.props.player.hp,
            gold: this.props.player.gold,
            ehp: this.enemy.hp,
        })
    }
    createGame() {
        this.props.player.hp = this.props.player.maxhp;
        this.enemy = new Enemy(50, 5, 1000, this);
        for (let follower in this.props.player.followers) {
            this.props.player.followers[follower].action()
        }
        this.enemy.startinterval(this.props.player);
        return this.enemy
    }
/*    componentDidMount(){
        this.interval = setInterval(this.update.bind(this),100)
    }
    componentWillUnmount(){
        clearInterval(this.interval)
    }*/
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
                <button onClick={this.props.player.attack.bind(this.props.player,this.state.enemy)}>ATTACK!</button>
                <div id={'messageArea'}/>
            </div>
        )
    }
}

class Village extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            gold: this.props.player.gold,
            av: this.props.player.av}}
    openFollowerShop(){
        ReactDOM.render(<FollowerShop updatePlayer={this.props.updatePlayer} player={this.props.player}/>,document.getElementById("popupArea"))
    }
    openPlayerShop(){
        ReactDOM.render(<PlayerShop updatePlayer={this.props.updatePlayer} player={this.props.player}/>,document.getElementById("popupArea"))
    }
    render(){
        return(
            <div className="bg" id={'gameArea'}>
                <div id={'popupArea'}/>
                <div>
                    <div>
                        <a className="nav-item1 btn btn-danger btn-rounded btn-lg" onClick={this.props.changeDungeon.bind(this)}>Play</a>
                    </div>
                    <div>
                        <button type="button" className="nav-item1 btn btn-danger btn-rounded btn-lg">Graveyard</button>
                    </div>
                    <div>
                        <button className="btn btn-danger btn-rounded btn-lg" id="btn-upgrade" onClick={this.openPlayerShop.bind(this)}>Smithy</button>
                    </div>
                    <div>
                        <button className="btn btn-danger btn-rounded btn-lg" id="btn-upgrade3">Leaderboard</button>
                    </div>
                    <div>
                        <button className="btn btn-danger btn-rounded btn-lg" id="btn-upgrade4" onClick={this.openFollowerShop.bind(this)}>Tavern</button>
                    </div>
                </div>
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
                <div>You escaped the dungeon with {this.props.player.gold} gold</div>
                <button onClick={this.removeMessage}>Close message</button>
            </div>
        )
    }
}

class DeathMessage extends React.Component{
    constructor(props){
        super(props)
    }
    removeMessage(){
        ReactDOM.unmountComponentAtNode(document.getElementById("popupArea"));
    }
    render(){
        return(
            <div id={'message'}>
                <div>You died in the dungeon</div>
                <div>you lost {this.props.player.gold} gold</div>
                <button onClick={this.removeMessage}>Close message</button>
            </div>
        )
    }
}

class FollowerShop extends React.Component{
    constructor(props){
        super(props);
        console.log(this.props.player);
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
        if(Object.keys(this.props.player.followers).length < 3){
            let follower = new type(name,lvl,interaval);
            this.props.player.followers[name] = follower;
            this.checkhired()
        }else{
            console.log("can't have more then tree followers")
        }
    }

    fireFollower(name){
        delete this.props.player.followers[name];
        this.checkhired()
    }
    upgradeFollower(type,lvl){
        if (this.props.player.gold>= 20*lvl){
            this.props.player.gold -= 20*lvl;
            this.setState({[type]:lvl+1})
        }
    }

    checkhired(){
        if('Warrior' in this.props.player.followers){
            this.setState({'warrior':true});
            this.buttonW = <div><button id={'followerbuttonW'} onClick={this.fireFollower.bind(this,'Warrior')}>Dismiss</button></div>
        }
        else{
            this.setState({'warrior': false});
            this.buttonW = <div>
                    <button id={'upgradefollowerW'} onClick={this.upgradeFollower.bind(this,'wlvl',this.state.wlvl)}>Upgrade Warrior</button>
                    <button id={'followerbuttonW'} onClick={this.hirefollower.bind(this,AutoWarrior,'Warrior',this.state.wlvl,1000)}>HIRE</button>
                </div>
        }
        if('Druid' in this.props.player.followers){
            this.setState({'druid':true});
            this.buttonD = <div><button id={'followerbuttonD'} onClick={this.fireFollower.bind(this,'Druid')}>Dismiss</button></div>
        }else {
            this.setState({'druid': false});
            this.buttonD = <div>
                <button id={'upgradefollowerD'} onClick={this.upgradeFollower.bind(this, 'dlvl', this.state.dlvl)}>Upgrade Druid</button>
                <button id={'followerbuttonD'} onClick={this.hirefollower.bind(this, AutoDruid, 'Druid', this.state.dlvl, 1500)}>HIRE</button>
            </div>;
        }
        if('Thief' in this.props.player.followers){
            this.setState({'thief':true});
            this.buttonT = <div><button id={'followerbuttonT'} onClick={this.fireFollower.bind(this,'Thief')}>Dismiss</button></div>
        }else {
            this.setState({'thief': false});
            this.buttonT = <div>
                <button id={'upgradefollowerT'} onClick={this.upgradeFollower.bind(this,'tlvl',this.state.tlvl)}>Upgrade Thief</button>
                <button id={'followerbuttonT'} onClick={this.hirefollower.bind(this,AutoThief,'Thief',this.state.tlvl,1000)}>HIRE</button>
            </div>
        }
        if('Cleric' in this.props.player.followers){
            this.setState({'cleric':true});
            this.buttonC = <div><button id={'followerbuttonC'} onClick={this.fireFollower.bind(this,'Cleric')}>Dismiss</button></div>
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
            gold: this.props.player.gold,
            playerav: this.props.player.av,
            playermaxhp: this.props.player.maxhp,
            avcost: 10+this.props.player.av*2,
            hpcost: 20+this.props.player.maxhp
        }
    }
    removeMessage(){
        this.props.player.SavePlayerState();
        ReactDOM.unmountComponentAtNode(document.getElementById("popupArea"));
    }
    avupgrade(){
        this.props.player.upgradeAV();
        this.setState({
            gold: this.props.player.gold,
            playerav: this.props.player.av,
            playermaxhp: this.props.player.maxhp,
            avcost: 10+this.props.player.av*2,
            hpcost: 20+this.props.player.maxhp
        })
    }
    hpupgrade(){
        this.props.player.upgradeHP();
        this.setState({
            gold: this.props.player.gold,
            playerav: this.props.player.av,
            playermaxhp: this.props.player.maxhp,
            avcost: 10+this.props.player.av*2,
            hpcost: 20+this.props.player.maxhp
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
                <button onClick={this.removeMessage.bind(this)}>Close Window</button>
            </div>
        );
    }
}

class ContinueScreen extends React.Component{
    removeMessage(){
        let element = document.getElementById('messageArea');
        ReactDOM.unmountComponentAtNode(element);
    }
    continue(){
        for(let follower in this.props.Container.props.player.followers){
             this.props.Container.props.player.followers[follower].action()
        }
        this.props.Container.enemy.hp = (this.props.Container.enemy.maxhp+=10);
        this.props.Container.enemy.startinterval(this.props.Container.props.player);
        this.props.Container.Stateupdate();
        this.removeMessage()
    }
    escape(){
        this.removeMessage();
        this.props.ChangeVillage(this);
        ReactDOM.render(<EscapeMessage player={this.props.Container.player}/>,ReactDOM.findDOMNode(document.getElementById("popupArea")));
    }
    render(){
        return(
            <div id={'message'}>
                <br/>
                <div>would you like to continue?</div>
                <div>WARNING <br/> If you die then you lose all of your gold!</div>
                <button onClick={this.escape.bind(this)}>No</button>
                <button onClick={this.continue.bind(this)}>Yes</button>
            </div>
        )
    }
}

ReactDOM.render(React.createElement(Game),document.getElementById('root'));