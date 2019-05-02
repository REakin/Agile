var xhr = new window.XMLHttpRequest(),
    method = "post",
    url = "http://localhost:8080/update";

var getxhr = new window.XMLHttpRequest(),
    getmethod = "get",
    geturl = "http://localhost:8080/getstats";


function xhrsend(){
    xhr.open(method,url,true);
    xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
    let data =
        {
            Clicks: numclicks.innerHTML,
            totalClicks: totalclicks.innerHTML,
            lvl: clicker.getlvl(),
            Lionel: Messi.getlvl(),
            Chritiano: Ronaldo.getlvl(),
            Paul: Pogba.getlvl(),
            Eden: Hazard.getlvl(),
            Neymar: Neymar.getlvl(),
            Zlatan: Zlatan.getlvl()
        };
    xhr.send(JSON.stringify(data));
}

getscores = getxhr.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200){
        stats = JSON.parse(this.response);
        window.total_clicks = parseInt(stats[0].totalClicks);
        window.clicks = parseInt(stats[0].Clicks);

        clicker = new Clicker(stats[0].lvl);
        Messi = new AutoClicker(stats[0].Lionel,200,'Lionel Messi',1,2000);
        Ronaldo = new AutoClicker(stats[0].Chritiano,500,'Cristiano Ronaldo',5,2000);
        Pogba = new AutoClicker(stats[0].Paul,2000,'Paul Pogba',20,10000);
        Hazard = new AutoClicker(stats[0].Eden,10000,'Eden Hazard',300,20000);
        Neymar = new AutoClicker(stats[0].Neymar,35000,'Neymar',1000,40000);
        Zlatan = new AutoClicker(stats[0].Zlatan,100000,'Zlatan Ibrahimovic',10000,50000);

        setInterval(xhrsend, 15000);
    }
};

function xhrget() {
    getxhr.open(getmethod, geturl, true);
    getxhr.send();
}

xhrget();
