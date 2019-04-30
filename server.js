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
    response.render('testing.hbs');
});


app.listen(port,() =>{
    console.log((`server is up and listing on port ${port}`))
 });
