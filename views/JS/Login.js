// var login = new window.XMLHttpRequest();
// var register = new window.XMLHttpRequest();

/*function handlesubmit() {
    sendlogin((res) => {
        console.log(res);
        return res
    });
}

function sendlogin(callback){
    let uname = document.getElementById('lusername').value;
    let password = document.getElementById('lpassword').value;
    login.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            let result = JSON.parse(this.response);
            if (result.auth === false) {
                //alert('Login Failed');
                callback(false)
            }
            if (result.auth === true) {
                callback(true)
            }
        }
    };
    data = {username:uname,password:password};
    login.open("post",`/logincheck`,true);
    login.setRequestHeader('Content-Type','application/json');
    login.send(JSON.stringify(data));
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
}*/
