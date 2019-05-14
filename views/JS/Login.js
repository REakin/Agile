var login = new window.XMLHttpRequest();

function sendlogin(){
    let uname = document.getElementById('lusername').value;
    let password = document.getElementById('lpassword').value;
    let data = {username:uname,password:password};
    login.open("post",`/logincheck`,false);
    login.setRequestHeader('Content-Type','application/json');
    login.send(JSON.stringify(data));
    let response = JSON.parse(login.response);
    if (response.auth == true){
        return true
    }else{return false}
}

function sendRegister(){
    var register = new window.XMLHttpRequest();
    let uemail = document.getElementById('remail').value;
    let uname = document.getElementById('rusername').value;
    let upassword = document.getElementById('rpassword').value;
    let data ={
        email: uemail,
        name:uname,
        password:upassword
    };
    register.open('post',"/checkreg",false);
    register.setRequestHeader('Content-Type','application/json');
    register.send(JSON.stringify(data));
    let response = JSON.parse(register.response);
    console.log(response);
    event.preventDefault()
}
