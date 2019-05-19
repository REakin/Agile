const express = require('express');
const hbs = require('hbs');
const bodyParser = require('body-parser'); //use it the forms for retrieving the data
const nodemailer = require('nodemailer');

// bcrypt stuff
const bcrypt = require('bcrypt');
let saltedRounds = 10;


//db instantiation
const mydb = require('./views/JS/DButils');

//session creation
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);


const port = process.env.PORT || 8080;

const app = express();

// const store = new MongoDBStore({
//     uri: 'mongodb+srv://RJEakin:xgk6viue@node-cluster-sriig.mongodb.net/test?retryWrites=true',
//     collection: 'mySessions'
//   },
//   function(error) {
//     console.log('error in db')
//   });

// // Catch errors
// store.on('error', function(error) {
//     console.log(error);
//   });

app.use(session({
    key: 'session_id',
    secret: 'dabOnEm',
    // store: store,
    resave: false,
    saveUninitialized: true,
    cookie:{httpOnly: false}
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended : true }));
hbs.registerPartials(__dirname+'/views/partials');

app.set('view engine','hbs');
app.use(express.static(__dirname+'/views/public'));
app.use(express.static(__dirname+'/views'));

// check for existing cookies that are not logged in 
// app.use((req, res, next) => {
//     if (req.cookies.session_id && !req.session.user) {
//         res.clearCookie('session_id');        
//     }
//     next();
// });


// check for logged-in users
// var sessionChecker = (req, res, next) => {
//     if (req.session.user && req.cookies.session_id) {
//         res.redirect('/game');
//     } else {
//         next();
//     }    
// };


app.get('/',(request,response)=>{
    console.log(request.headers.cookie);
    response.render('login.hbs');
});

app.post('/register', async function (req,res){
    let db = mydb.getDb();
    console.log(req.body.remail);
    console.log(req.body.rusername);
    console.log(req.body.rpassword);

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
    res.redirect('/game');
});

app.post('/logincheck',(req,res)=>{
    let db = mydb.getDb();
    console.log(req.body);
    let username = req.body.username;
    let password = req.body.password;
    console.log(username);
    db.collection('Users').find({'username':username}).toArray((err,result)=>{
        if (err) throw err;
        if (result.length !== 0){
            console.log(result);
            let hashedPass = result[0].password;
            bcrypt.compare(password, hashedPass, function(error, result){
                if (error) {throw error;}
                else if (result === false) {
                    console.log('Password bad');
                    res.send({'auth':false})}
                else if (result === true) {
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
    res.render('game.hbs');
    //console.log(req.session.gay)
});

//Ajax call
app.get('/getState',(req,res)=>{
    let db = mydb.getDb();
    db.collection('Scores').find({name:"debug"}).toArray((err,result)=>{
      if (err) throw err;
      res.send(result,undefined,2)
    })
});

app.post('/saveState',(req,res)=>{
    console.log(req.body);
    let db = mydb.getDb();
    let data = {$set:req.body};

    db.collection('Scores').updateOne({name:'debug'},data,function (err,res) {
        if(err) throw err;
    })
});


app.listen(port,() =>{
    console.log((`server is up and listing on port ${port}`));
    mydb.init();
});
