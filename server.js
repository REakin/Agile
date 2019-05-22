const express = require('express');
const hbs = require('hbs');
const bodyParser = require('body-parser'); //use it the forms for retrieving the data
// bcrypt stuff
const bcrypt = require('bcryptjs');
let saltedRounds = 10;

//db instantiation
const mydb = require('./views/JS/DButils');

//session creation
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);

const port = process.env.PORT || 8080;

const app = express();

const store = new MongoDBStore({
    uri: 'mongodb+srv://RJEakin:xgk6viue@node-cluster-sriig.mongodb.net/test?retryWrites=true',
    databaseName: 'Clicker',
    collection: 'mySessions'
  });

// Catch errors
store.on('error', function(error) {
    console.log(error);
  });

app.use(session({
    key: 'session_id',
    secret: 'dabOnEm',
    store: store,
    resave: false,
    saveUninitialized: true,
    cookie:{
        httpOnly: false,
        maxAge: 60 * 60 * 1000 // 1 hour
    }
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended : true }));
hbs.registerPartials(__dirname+'/views/partials');

app.set('view engine','hbs');
app.use(express.static(__dirname+'/views/public'));
app.use(express.static(__dirname+'/views'));

// check for existing cookies that are not logged in 
app.use((req, res, next) => {
    //console.log(req.session)
    // console.log(req.session.user)
    //console.log(req);
    if (req.sessionID && !req.session.user) {
        res.clearCookie('session_id');        
    }
    next();
});


// check for logged-in users
var sessionChecker = (req, res, next) => {
    console.log(req.session.user)
    if (req.session.user) {
        res.redirect('/game');
    } else {
        next();
    }    
};


app.route('/')
    .get(sessionChecker, (req, res) => {
        res.render('login.hbs');
    });

app.post('/register', async function (req,res){
    let db = mydb.getDb();
    let username = req.body.rusername;
    let password = req.body.rpassword;
    let email = req.body.remail;

    let hashedPass = await bcrypt.hash(password, saltedRounds);

    db.collection('Users').insertOne({
        username: username,
        password: hashedPass,
        email: email
    }, (error) => {
        if (error) throw error;
    });
    db.collection('Scores').insertOne({
        php:50,
        pav:5,
        pgold:0,
        name:username,
        Wlvl:0,
        Dlvl:0,
        Tlvl:0,
        Clvl:0,
        PastRun:[]
    });


    res.redirect('/');
});
app.post('/checkreg',(req,res)=>{
    let db = mydb.getDb();
    let servercheck = {};
    db.collection('Users').find({'email': req.body.email}).toArray((err,result)=>{
        if (err) throw err;
        servercheck['email'] = result.length !== 0;
        db.collection('Users').find({'username':req.body.name}).toArray((err,result)=>{
            if (err) throw err
            servercheck['username'] = result.length !== 0;
            res.send(servercheck);
        })
    });
});
app.post('/login',(req,res)=>{
    console.log('_SESSION ZONE_')
    console.log(req.session.user)
    res.redirect('/game');
});

app.post('/logOut',(req,res)=>{
    let db = mydb.getDb();
    db.collection('mySessions').remove(
    {
        '_id':{
            $eq: req.sessionID
        }
    },{
        justOne: true
    });
    console.log('_SESSION ZONE_')
    console.log(req.session.user)
    res.redirect('/');
});

app.post('/logincheck',(req,res)=>{
    let db = mydb.getDb();
    let username = req.body.username;
    let password = req.body.password;
    db.collection('Users').find({'username':username}).toArray((err,result)=>{
        if (err) throw err;
        if (result.length !== 0){
            // console.log(result);
            let hashedPass = result[0].password;
            bcrypt.compare(password, hashedPass, function(error, result){
                if (error) {throw error;}
                else if (result === false) {
                    console.log('Password bad');
                    res.send({'auth':false})}
                else if (result === true) {
                    console.log(username)
                    req.session.user = username;
                    res.send({'auth':true})
                }
            })
        }
        else{
            res.send({'auth':false})
        }
    });
});
app.get('/game',(req,res)=>{
    if (!req.session.user) {
        res.redirect('/');
    } else {
    res.render('game.hbs');
    };
    //console.log(req.session.gay)
});

//Ajax call
app.get('/getState',(req,res)=>{
    let user = req.session.user;
    let db = mydb.getDb();
    db.collection('Scores').find({name:user}).project({PastRun:0}).toArray((err,result)=>{
      if (err) throw err;
      res.send(result,undefined,2)
    })
});
app.post('/saveState',(req,res)=>{
    let user = req.session.user;
    let PastRun=req.body.PastRun;
    delete req.body['PastRun'];
    let db = mydb.getDb();
    if(PastRun !== undefined){
        data = {$set:req.body, $push:{PastRun:{$each:[PastRun],$slice:-10}}};
    }else{
        data = {$set:req.body}
    }
    db.collection('Scores').updateOne({name:user},data,function (err,res) {
        if(err) throw err;
    })
});

app.get('/PLeaderBoard',(req,res)=>{
    player = req.query.name;
    let db= mydb.getDb();
    db.collection('Scores').find({name:player}).project({PastRun:1}).toArray((err,result)=>{
        if (err) throw err;
        let data = result[0].PastRun;
        //console.log(data);
        res.send(data)
    })
});
app.get('/GLeaderBoard',(req,res)=>{
    let db= mydb.getDb();
    db.collection('Scores').find({}).project({_id:0,PastRun:1}).toArray((err,result)=>{
        if (err) throw err;
        let data = [];
        result.forEach(function (player) {
            player.PastRun.forEach(function (run) {
                data.push(run)
            })
        });
        data.sort(function (a,b) {return b[0] - a[0]});
        res.send(data)
    })
});

app.listen(port,() =>{
    console.log((`server is up and listing on port ${port}`));
    mydb.init();
});
