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
    render(){
        return(
            <div id={'content'}>
                <h1>CLICK DUNGEON</h1>
                <h2>Sign in</h2>
                <div id={"login_form"}>
                    <form method={"POST"}>
                        <input name={"username"} type={"text"} placeholder={"Username"} required={"required"}/>
                            <input name={"password"} type={"password"} placeholder={"Password"} required={"required"}/>
                    </form>
                </div>
                <p id={"forgot_note"}><a onClick={this.props.changeForgot}>Forgot password</a></p>
                <div id={"login_form"}>
                    <form action={"/login"} method={"POST"} onSubmit={this.sendlogin}>
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
    render(){
        return(
            <div id={'content'}>
                <h1>CLICK DUNGEON</h1>
                <h2>Sign Up</h2>
                <div id={"login_form"}>
                    <form action={"/register"} method={"POST"} onSubmit={this.sendRegister}>
                        <input name={'Email'} type={'email'} placeholder={'Email'} required={"required"}/>
                        <input name={"username"} type={"text"} placeholder={"Username"} required={"required"}/>
                        <input name={"password"} type={"password"} placeholder={"Password"} required={"required"}/>
                    </form>
                </div>
                <div id={"login_form"}>
                    <form action={"/login-user"} method={"POST"}>
                        <input type={'submit'} id={'loginBtn'} value={"Login"}/>
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
                    <input type={'submit'} id={'loginBtn'} value={"Login"}/>
                </form>
                <a onClick={this.props.changeLogin}>Return to login</a>
            </div>
        )
    }
}


function getCurrentTime() {
    var date = new Date();
    var timeInfo = date.getFullYear() + "_" + (date.getMonth() + 1) + "_" + date.getDate() + "  " +
        date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();

    var spanObj = document.getElementById("time");

    spanObj.innerHTML = timeInfo.fontcolor("blue");
}

getCurrentTime();

window.setInterval("getCurrentTime()", 1000);

ReactDOM.render(React.createElement(loginpage),document.getElementById('root'));