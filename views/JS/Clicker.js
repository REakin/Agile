class Clicker{
    //This will be the actual button that the user clicks on :)
    constructor(lvl){
        this.lvl = parseInt(lvl);
        this.nextPrice = 10*(this.lvl*30);
        this.lvlDisplay = document.getElementById('clickerLvl');
        this.priceDisplay = document.getElementById('lvlprice');
        this.display();
        this.sender()
    }

    click(){
        window.clicks += this.lvl;
        window.total_clicks += this.lvl;
        this.display();
    }
    lvlUp(){
        if(window.clicks >= this.nextPrice) {
            window.clicks -= this.nextPrice;
            this.lvl += 1;
            this.nextPrice = 10*(this.lvl*30);
            this.sender();
        }
    }

    sender(){
        this.lvlDisplay.innerHTML = this.lvl;
        this.priceDisplay.innerHTML = this.nextPrice;
        this.display()

    }

    display(){
    numclicks.innerHTML = window.clicks;
    totalclicks.innerHTML= window.total_clicks;
    }
    getlvl(){
        return this.lvl
    }
}


class AutoClicker{
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
}


var autoclickarea = document.getElementById('autoclickarea');
var numclicks = document.getElementById('clicks');
var totalclicks = document.getElementById('totalClicks');

