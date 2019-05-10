var xhr = new window.XMLHttpRequest();
var getxhr = new window.XMLHttpRequest();

function xhrsend(){
    xhr.open('post',`/saveState`);
    let data =
        {
            playername: player.name,
            php: player.maxhp,
            pgold: player.gold,
            pav: player.av
        };
    xhr.send(JSON.stringify(data));
}

getscores = getxhr.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200){
        let stats = JSON.parse(this.response);
        let playername = stats[0].name;
        let hp = stats[0].php;
        let gold = stats[0].pgold;
        let av = stats[0].pav;
        start(playername,hp,gold,av)
    }
};

function getStats() {
    getxhr.open("get", `/getState`);
    getxhr.send();
}