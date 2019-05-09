var xhr = new window.XMLHttpRequest(),
    method = "post",
    url = "http://localhost:8080/saveState";

var getxhr = new window.XMLHttpRequest(),
    getmethod = "get",
    geturl = "http://localhost:8080/getState";

function xhrsend(){
    xhr.open(method,url,true);
    xhr.setRequestHeader('Content-Type', 'JSON');
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
        stats = JSON.parse(this.response);
        console.log(stats);
        let playername = stats[0].name;
        let hp = stats[0].php;
        let gold = stats[0].pgold;
        let av = stats[0].pav;
        start(playername,hp,gold,av)
    }
};

function getStats() {
    getxhr.open(getmethod, geturl, true);
    getxhr.setRequestHeader('Content-Type', 'JSON');
    getxhr.send();
}