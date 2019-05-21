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
            rdnum: 0,
            difficulty:1,
            bg:"path",
            enemyPhoto:"url"
        };
    }
    updateEHPbar(){
        let EBar = $('.health-bar1');
        let Ehit = EBar.find('.Ehit');
        Ehit.css('width',(1-this.state.ehp/this.state.enemy.maxhp)*100+'%');
        EBar.data('value',this.state.ehp);
    }
    updateHHPbar(){
        let HBar = $('.health-bar1');
        let Hhit = HBar.find('.hit');
        Hhit.css('width',(1-this.state.playerhp/this.state.maxhp)*100+'%');
        HBar.data('value',this.state.playerhp);
    }
    Stateupdate(){
        this.setState({
            enemy: this.enemy,
            maxhp: this.props.player.maxhp,
            playerhp: this.props.player.hp,
            gold: this.props.player.gold,
            ehp: this.enemy.hp,
        });
        this.updateEHPbar();
        this.updateHHPbar();
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
    render(){
        return(
            <div id={'gameArea'}>
                <div className={'bg2'}>
                    <div className={'enemyArea'}>
                        <div className={"health-bar1 enemyHealthBar"} data-total={this.state.enemy.maxhp} data-value={this.state.ehp}>
                            <div id={'EBar'} className={"Ebar"}>
                                <div id={'EHit'} className={"Ehit"}/>
                            </div>
                        </div>
                        <img src={'../Game Assets/Enemys/enemy'+this.state.difficulty+this.state.enemyPhoto+'.png'} className={"enemyPhoto"} onClick={this.props.player.attack.bind(this.props.player,this.state.enemy)}/>
                    </div>
                </div>
                <div className={'PlayerArea'}>
                    <img className={'PlayerPhoto'} src={"../Images/PlayerPhoto.png"}/>
                    <div className={"playerHealthBar health-bar1"} data-total={this.state.maxhp} data-value={this.state.playerhp}>
                        <div className={"bar"}>
                            <div className={"hit"}/>
                        </div>
                    </div>
                    <div className={'PlayerStats'}>
                        Kills: {this.state.kills}  {'\u00A0 \u00A0 \u00A0'}
                        Round: {this.state.rdnum}  {'\u00A0 \u00A0 \u00A0'}
                        gold: {this.state.gold}
                    </div>
                </div>
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
    openLeaderboard(){
        ReactDOM.render(<Leaderboard player={this.props.player}/>,document.getElementById("popupArea"))
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
                        <a className="nav-item1 btn btn-danger btn-rounded btn-lg" id="btn-upgrade" onClick={this.openPlayerShop.bind(this)}>Smithy</a>
                    </div>
                    <div>
                        <a className="nav-item1 btn btn-danger btn-rounded btn-lg" id="btn-upgrade3" onClick={this.openLeaderboard.bind(this)}>Leaderboard</a>
                    </div>
                    <div>
                        <a className="nav-item1 btn btn-danger btn-rounded btn-lg" id="btn-upgrade4" onClick={this.openFollowerShop.bind(this)}>Tavern</a>
                    </div>
                    <div>
                        <form action="/logOut" method="post">
                            <button type="submit" className="nav-item1 btn btn-danger btn-rounded btn-lg">Log Out</button>
                        </form>
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
        this.props.player.SavePlayerState();
        ReactDOM.unmountComponentAtNode(document.getElementById("popupArea"));
    }
    render(){
        return(
            <div id={'message'}>
            <h1>Recruit</h1><span className={"modal-close button"} onClick={this.removeMessage.bind(this)}>X</span>
            <div className={"warrior-desc"}>
                Job:Warrior<br/>
                Deals Damage to the enemy<br/>
                Lvl: {this.state.wlvl};
            </div>
            <div className={"warrior-button"}>
                {this.buttonW}
            </div>
            <div className={"warrior"}>
                <img className={'AutoPhoto'} src={"../Images/AutoWarrior.png"} alt={"warrior"}/>
            </div>
            <div className={"cleric-desc"}>
                Job: Cleric<br/>
                Slows Enemy Attack rate<br/>
                Lvl: {this.state.clvl};
            </div>
        <div className={"cleric-button"}>
            {this.buttonC}
        </div>
        <div className={"cleric"}>
            <img className={"AutoPhoto"} src={"../Images/AutoChar1.png"} alt={"cleric"}/>
        </div>
        <div className={"druid-desc"}>
            Job: Druid<br/>
            Heals Player per second<br/>
            Lvl: {this.state.dlvl};
        </div>
        <div className={"druid-button"}>
            {this.buttonD}
        </div>
        <div className={"druid"}>
            <img className={"AutoPhoto"} src={"../Images/AutoDruid.png"} alt={"cleric"}/>
        </div>
                <div className={"thief-desc"}>
                    Job: Thief<br/>
                    Earns gold per second<br/>
                    Lvl: {this.state.tlvl};
                </div>
                <div className={"thief-button"}>
                    {this.buttonT}
                </div>
                <div className={"thief"}>
                    <img className={"AutoPhoto"} src={"../Images/AutoThief.png"} alt={"cleric"}/>
                </div>
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
                <div className="upgradeweapons">
                    <h1>Upgrade Weapons and Armour</h1>
                </div>
                <br/>
                <div className="value">
                    <img src="../Images/5071.jpg" alt="sword" onClick={this.avupgrade.bind(this)}/>
                    <div className={'itemDesc'}>+5 ATT<br/>Cost: {this.state.avcost} coins</div>
                    <br/>
                    <img src="../Images/5073.jpg" alt="armor" onClick={this.hpupgrade.bind(this)}/>
                    <div className={'itemDesc'}>+10 HP <br/>Cost: {this.state.hpcost} coins</div>
                </div>
                <div className={'goldAmount'}>Your Gold: {this.state.gold}</div>
                <span className="modal-close button" onClick={this.removeMessage.bind(this)}>X</span>
            </div>
        );
    }
}

class Leaderboard extends React.Component{
    constructor(props){
        super(props);
        this.state={
            global:false
        }
    }
    playerScores(){
        let getScores = new window.XMLHttpRequest();
        getScores.open("get",`/PLeaderBoard?name=${this.props.player.name}`,false);
        getScores.send();
        let response = JSON.parse(getScores.response);
        //console.log(response);
        this.state ={scores:response, global:false};
        return this.renderScores()
    };
    globalScores(){
        let getScores = new window.XMLHttpRequest();
        getScores.open("get",`/GLeaderBoard`,false);
        getScores.send();
        let response = JSON.parse(getScores.response);
        //console.log(response);
        this.state ={scores:response, global: true};
        return this.renderScores()
    };
    removeMessage(){
        ReactDOM.unmountComponentAtNode(document.getElementById("popupArea"));
    }
    renderScores(){
        return this.state.scores.map((score, index)=>{
            const {Score} = score;
            //console.log(score);
            return(
                <tr>
                    <td>{index}</td>
                    <td>Username: {score[4]}</td>
                    <td>Round: {score[1]}</td>
                    <td>Kills: {score[0]}</td>
                    <td>MaxHP: {score[2]}</td>
                    <td>AV: {score[3]}</td>
                    <td>Result: {score[5]}</td>
                </tr>
            )
        })
    }
    changeGlobal(){
        this.setState({global:true});
    }
    changePersonal(){
        this.setState({global:false});
    }
    render() {
            if(this.state.global === false) {
                return (
                    <div id={'message'}>
                        <h1>Recent Runs</h1>
                        <button onClick={this.changeGlobal.bind(this)}>Global</button>
                        <div id={'scorebox'}>
                            <table id={'scores'}>
                                <tbody>
                                {this.playerScores()}
                                </tbody>
                            </table>
                        </div>
                        <button onClick={this.removeMessage.bind(this)}>Close Window</button>
                    </div>
                )
            }
            else{
                return(
                    <div id={'message'}>
                        <h1>Global LeaderBoard</h1>
                        <div id={'scorebox'}>
                            <table id={'scores'}>
                                <tbody>
                                {this.globalScores()}
                                </tbody>
                            </table>
                        </div>
                        <button onClick={this.changePersonal.bind(this)}> Personal</button>
                        <button onClick={this.removeMessage.bind(this)}>Close Window</button>
                    </div>
                )
            }
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
        this.removeMessage();
    }
    escape(){
        this.removeMessage();
        this.props.Container.props.player.hp = this.props.Container.props.player.maxhp;
        this.props.Container.props.player.SavePlayerStateAndRun([this.props.Container.state.kills,this.props.Container.state.rdnum,this.props.Container.props.player.maxhp,this.props.Container.props.player.av,this.props.Container.props.player.name,'Escaped']);

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

//Builds Game
ReactDOM.render(React.createElement(Game),document.getElementById('root'));