class Player{
    //This will be the actual button that the user clicks on :)
    constructor(username, maxhp, gold, av){
        this.name = username;
        this.maxhp = parseInt(maxhp);
        this.hp = parseInt(maxhp);
        this.gold = parseInt(gold);
        this.av = parseInt(av);
        this.bonusav = 0
    }

    attack(){
        if  (this.hp > 0) {
            //console.log('i attacked');
            enemy.takedamage(this.av+this.bonusav)
        }
    }

    takedamage(damage){
        this.hp -= damage;
        //playerhealth.innerHTML = this.hp;
        if(this.hp <= 0){
            this.die()
        }
    }
    ability1(){
        this.bonusav += 5;
        setTimeout(function(){
            player.bonusav -= 5;
        },2000)
    }

    endgame(){
        ReactDOM.render(e(gameover),document.getElementById('root'));
        ReactDOM.render(e(escapeMessage),document.getElementById('messageArea'))
    }

    die(){
        clearInterval(enemy.attackint);
        //alert('You have died!');
        player.gold = 0;
        ReactDOM.render(e(gameover),document.getElementById('root'));
        ReactDOM.render(e(deathMessage),document.getElementById('messageArea'))
    }
}

class Enemy{
    constructor(hp,av,i,){
        this.maxhp = parseInt(hp);
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
        window.rdnum +=1;
        if (window.rdnum % 5 === 0){
            delete window.enemy;
            ReactDOM.render(e(continueScreen),document.getElementById('messageArea'))
        }else{
            delete window.enemy;
            window.enemy = new Enemy(100+(10*rdnum),5,1000)
        }
    }
}

class autochar{
    constructor(name,av,interval) {
        this.name = name;
        this.av = av;
        this.interval = interval
    }
    upgrade(){
        if (player.gold >= 10){
            this.av += 5
        }
    }
    attack(){
        if (player.hp > 0) {
            enemy.takedamage(this.av);
        }
    }
    startint(){
        setInterval(this.attack.bind(this),this.interval)
    }
}