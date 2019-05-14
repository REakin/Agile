class loginpage extends React.Component{
    constructor(props){
        super(props);
        this.state={
            login:true,
            register:false,
            forgot:false
        }
    }
    changeLogin(){
        this.setState({
            login:true,
            register:false,
            forgot:false
        })
    }
    changeRegister(){
        this.setState({
            login:false,
            register:true,
            forgot:false
        })
    }
    changeForgot(){
        this.setState({
            login:false,
            register:false,
            forgot:true
        })
    }
    render(){
        if (this.state.login == true){
            return(<Loginform changeRegister={this.changeRegister.bind(this)} changeForgot={this.changeForgot.bind(this)}/>)
        }
        else if (this.state.register== true){
            return(<Registerform changeLogin={this.changeLogin.bind(this)}/>)
        }
        else if(this.state.forgot == true){
            return(<Forgotform changeLogin={this.changeLogin.bind(this)}/>)
        }
    }
}


class Loginform extends React.Component{
    constructor(props){
        super(props)
    }

    sendlogin(){
        var login = new window.XMLHttpRequest();
        let uname = document.getElementById('lusername').value;
        let password = document.getElementById('lpassword').value;
        let data = {username:uname,password:password};
        login.open("post",`/logincheck`,false);
        login.setRequestHeader('Content-Type','application/json');
        login.send(JSON.stringify(data));
        let response = JSON.parse(login.response);
        if (response.auth == true){
            return true
        }else{
            alert('Login Failed');
            event.preventDefault()
        }

    }

    render(){
        return(
            <div id={'content'}>
                <h1>CLICK DUNGEON</h1>
                <h2>Sign in</h2>
                <div id={"login_form"}>
                    <form method={"POST"}>
                        <input id={'lusername'} name={"username"} type={"text"} placeholder={"Username"} required={"required"}/>
                            <input id={'lpassword'} name={"password"} type={"password"} placeholder={"Password"} required={"required"}/>
                    </form>
                </div>
                <p id={"forgot_note"}><a onClick={this.props.changeForgot}>Forgot password</a></p>
                <div id={"login_form"}>
                    <form action={"/login"} method={"POST"} onSubmit={this.sendlogin.bind(this)}>
                        <input type={'submit'} id={'loginBtn'} value={"Login"}/>
                    </form>
                </div>

                <p id={'reg_note'}>Don't have an account?&nbsp;&nbsp;
                    <a onClick={this.props.changeRegister}>Sign up here.</a>
                </p>
            </div>
        )
    }
}

class Registerform extends React.Component{
    constructor(props){
        super(props)
    }
    sendRegister(){
        let re = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})');
        var register = new window.XMLHttpRequest();
        let uemail = document.getElementById('remail').value;
        let uname = document.getElementById('rusername').value;
        let upassword = document.getElementById('rpassword').value;
        let data ={
            email: uemail,
            name:uname
        };
        register.open('post',"/checkreg",false);
        register.setRequestHeader('Content-Type','application/json');
        register.send(JSON.stringify(data));
        let response = JSON.parse(register.response);
        console.log(response);
        if (response.email === true){
            event.preventDefault()
        }
        else if(response.username === true){
            event.preventDefault()
        }
        else if(upassword.search(re) === -1){
            event.preventDefault()
        }
        else{
            console.log(upassword);
            console.log('I PASSED!');
            event.preventDefault()
        }
    }

    render(){
        return(
            <div id={'content'}>
                <h1>CLICK DUNGEON</h1>
                <h2>Sign Up</h2>
                <div id={"register_form"}>
                    <form action={"/login-user"} method={"POST"} onSubmit={this.sendRegister.bind(this)}>
                        <input id={'remail'} name={'Email'} type={'email'} placeholder={'Email'} required={"required"}/>
                        <input id={'rusername'} name={"username"} type={"text"} placeholder={"Username"} required={"required"}/>
                        <input id={'rpassword'} name={"password"} type={"password"} placeholder={"Password"} required={"required"}/>
                        <br/>Password MUST contain an Upper case letter, Lower case letter,
                        a number, a special character and must be larger then 8 characters
                        <input type={'submit'} id={'loginBtn'} value={"Register"}/>
                    </form>
                    <a onClick={this.props.changeLogin}>Return to login</a>
                </div>
            </div>
        )
    }
}


class Forgotform extends React.Component{
    constructor(props) {
        super(props);
    }
    render(){
        return(
            <div id={'content'}>
                <h1>CLICK DUNGEON</h1>
                <h2>Forgot Your Password</h2>
                <div id={"login_form"}>
                    <form method={"POST"}>
                        <input name={"username"} type={"text"} placeholder={"Username"} required={"required"}/>
                    </form>
                </div>
                <form action={"/login"} method={"POST"} onSubmit={'sendlogin'}>
                    <input type={'submit'} id={'loginBtn'} value={"Submit"}/>
                </form>
                <a onClick={this.props.changeLogin}>Return to login</a>
            </div>
        )
    }
}


ReactDOM.render(React.createElement(loginpage),document.getElementById('root'));