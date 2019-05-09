const express = require('express');
const cookieParser = require('cookie-parser');
const hbs = require('hbs');
const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser'); //use it the forms for retrieving the data
const uuid = require('uuid/v1'); //creates unique ID's
const nodemailer = require('nodemailer');

const mydb = require('./views/JS/DButils');

const port = process.env.PORT || 8080;

var app = express();

///using a mail server to direct emails to a user...


/*var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'DClicker.no.reply@gmail.com',
        pass: 'Clicker123'
    }
});

var mailOptions = {
    from: 'DClicker.no.reply@gmail.com',
    to: 'tjpriestley@gmail.com',
    subject: 'Flair',
    text: 'Surprising enough?'
};


transporter.sendMail(mailOptions, function(error, info){
    if (error) {
        console.log(error);
    } else {
        console.log('Email sent: ' + info.response);
    }
});*/

//secret is used for signing cookies. Its used to parse and match cookie sessions

app.use(cookieParser('secret'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended : true }));
hbs.registerPartials(__dirname+'/views/partials');

app.set('view engine','hbs');
app.use(express.static(__dirname+'/views/public'));
app.use(express.static(__dirname+'/views'));


app.get('/',(request,response)=>{
    response.render('login.hbs');
});

app.post('/register',(req,res)=>{
    console.log(req.body);
    res.redirect('/game')
});

app.post('/login',(req,res)=>{
    console.log(req.body.Username);
    console.log(req.body.Password);
    res.redirect('/game')
});

app.get('/game',(req,res)=>{
    res.render('game.hbs')
});

//Ajax call
app.get('/getState',(req,res)=>{
    let db = mydb.getDb();
    db.collection('Scores').find({name:"Test"}).toArray((err,result)=>{
      if (err) throw err
      res.send(result,undefined,2)
    })
});

app.post('/saveState',(req,res)=>{
    let db = mydb.getDb();
    let data = {$set:req.body};
    db.collection('Scores').updateOne({name:'Test'},data,function (err,res) {
        if(err) throw err
    })
});


app.listen(port,() =>{
    console.log((`server is up and listing on port ${port}`));
    mydb.init();
});
