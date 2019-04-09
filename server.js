const express = require('express');
const cookieParser = require('cookie-parser');
const hbs = require('hbs');
const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser'); //use it the forms for retrieving the data
const uuid = require('uuid/v1'); //creates unique ID's
const port = process.env.PORT || 8080;

const uri = "mongodb+srv://RJEakin:xgk6viue@node-cluster-sriig.mongodb.net/test?retryWrites=true";

var app = express();



//secret is used for signing cookies. Its used to parse and match cookie sessions
app.use(cookieParser('secret'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended : true }));
hbs.registerPartials(__dirname+'/views/partials');

app.set('view engine','hbs');
app.use(express.static(__dirname+'/views/public'));
app.use(express.static(__dirname+'/views'));


app.get('/',(request,response)=>{
    response.render('login.hbs')
});

app.get('/clicker',(request, response)=>{
    if (request.signedCookies.ID == undefined){
        response.redirect('/')
    }else {
        MongoClient.connect(uri, { useNewUrlParser: true }, (err, client) => {
            var database = client.db("Clicker");
            database.collection('Scores').findOne({_id: request.signedCookies.ID})
                .then(function (doc) {
                    response.render('clicker.hbs',{
                        username:doc.Username //send the username to the navbar to the top right 
                    });
                })
        });
    }
});
//ajax command
app.get('/getstats',(req,res)=>{
    MongoClient.connect(uri,{useNewUrlParser: true}, (err,client)=>{
        var database = client.db('Clicker');
        database.collection('Scores').find({_id: req.signedCookies.ID}).toArray((err,result)=>{
            if (err) res.send('Error querying database!');
            //console.log(result);
            res.send(result)
        })
    })
});


app.post('/login',(request,response)=>{
    MongoClient.connect(uri, { useNewUrlParser: true }, (err, client) => {
        var database = client.db("Clicker");
        database.collection('Users').findOne({Username: request.body.Username, Password: request.body.Password})
            .then(function (doc) {
                if(doc == null){
                    response.render('login.hbs',{
                        loginmsg: 'Username or Password Incorrect'
                    });
                }else{
                    response.cookie('ID',doc._id,{signed: true});
                    response.redirect('/clicker');
                }
            })
    });
});

app.post('/register',(request,response)=>{
  //creates a user and adds to our mongo database
   MongoClient.connect(uri, { useNewUrlParser: true }, (err, client) => { //connecting
        let uid = uuid(); // creates a unique ID
        var database = client.db("Clicker"); //Connects to our clicker database
       database.collection('Users').findOne({Username: request.body.Username}) //Check if user already exists
           .then(function (doc) {
               if(doc == null){
                   //'User does not exist'
                   database.collection("Users").insertOne({
                       _id: uid,
                       Username: request.body.Username,   // This inserts the new user into the database. Users collection
                       Password: request.body.Password
                   });
                   database.collection("Scores").insertOne({ //Creates a game state for that user
                       _id: uid,
                       Username: request.body.Username,
                       Clicks: 0, //currency to buy levels 
                       totalClicks: 0, //total
                       lvl: 1, //what level user currently is on
                       Lionel: 0,
                       Chritiano: 0, //all the scores of the clicker game 
                       Paul: 0,
                       Eden: 0, //the autos 
                       Neymar: 0,
                       Zlatan: 0
                   });
                   //console.log("User added to database");
                   response.cookie('ID',uid,{signed:true}); //when the user is added it redirects to the game page. Three params; name , value, option
                   response.redirect('/clicker');
               }else{
                   //console.log('Did not write to database');
                   response.render('login.hbs',{                // If username is already in use redirects to login page again with error message.
                       Registermsg:'Username already in use!'
                   });
               }
           })
   });
});

app.get('/logout',(req,response)=> {
    response.clearCookie('ID');// clears the login cookie
    response.redirect('/')
});

//ajax command
app.get('/getscores',(req,res)=>{
    MongoClient.connect(uri,{useNewUrlParser: true}, (err,client)=>{
        var database = client.db('Clicker');
        database.collection('Scores').find().project({Username: 1, totalClicks: 1, _id: 0}).toArray((err,result)=>{
            if (err) res.send('Error querying database!');
            result.sort(function (a,b) {return b.totalClicks - a.totalClicks});
            res.send(result)
        })
    })
});

app.get('/leaderboard',(req,res)=>{
    res.render('leaderboard.hbs');
});

//ajax command
app.post('/update',(req,res)=> {
    try {
        let query = {_id: req.signedCookies.ID};
        let info = {$set:req.body};
        MongoClient.connect(uri, {useNewUrlParser: true}, (err, client) => {
            if(err) throw err;
            var database = client.db("Clicker");
            database.collection('Scores').updateOne(query, info, function (err, res) {
                if (err) throw err;
            })
        })
    }
    catch (e) {
        res.redirect('/')
    }
});

app.listen(port,() =>{
   console.log((`server is up and listing on port ${port}`))
});