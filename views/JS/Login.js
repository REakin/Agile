var login = new window.XMLHttpRequest();
var register = new window.XMLHttpRequest();

function sendlogin(){
    let uname = document.getElementById('lusername').value;
    let password = document.getElementById('lpassword').value;
    login.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
            let result = JSON.parse(this.response)
            console.log(result);
            if(result.auth === false){alert('Login Failed');}
            if(result.auth === true){alert('You are logged in');}
        }
    };

    login.open("get",`/login?username=${uname}&password=${password}`);
    login.send();
}