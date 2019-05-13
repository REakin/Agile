var login = new window.XMLHttpRequest();
var register = new window.XMLHttpRequest();

function sendlogin(){
    let uname = document.getElementById('lusername').value;
    let password = document.getElementById('lpassword').value;
    let data = {username:uname,password:password};
    login.open("post",`/logincheck`,false);
    login.setRequestHeader('Content-Type','application/json');
    login.send(JSON.stringify(data));
    let response = JSON.parse(login.response)
    if (response.auth == true){
        return true
    }else{return false}
}

function sendRegister(){
    let uemail = document.getElementById('remail').value;
    let uname = document.getElementById('rusername').value;
    let password = document.getElementById('rpassword').value;

    register.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
            console.log('idk');
        }
    };
    register.open("post",`/register?email=${uemail}&username=${uname}&password=${password}`);
    register.send();
}
