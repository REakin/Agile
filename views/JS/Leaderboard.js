unames = '';
uscore = '';
position = '';
var xhr = new window.XMLHttpRequest(),
    method = "get",
    url = "http://localhost:8080/getscores";

function xhrget() {
    xhr.open(method, url, true);
    xhr.send();
}

xhrget();

getscores = xhr.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200){
        //console.log(this.response);
        scores = JSON.parse(this.response);


        for (var score = 0; score <= 9; score++){
            unames += scores[score].Username+"\n\n";
            uscore += scores[score].totalClicks+"\n\n";
            position += (1+score)+'. \n\n'
        }
        document.getElementById('position').innerText = position;
        document.getElementById('names').innerText = unames;
        document.getElementById('userscores').innerText = uscore;
        }
};

