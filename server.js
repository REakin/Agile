const express = require('express');
const cookieParser = require('cookie-parser');
const hbs = require('hbs');
const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser'); //use it the forms for retrieving the data
const uuid = require('uuid/v1'); //creates unique ID's
const port = process.env.PORT || 8080;

const uri = "mongodb+srv://RJEakin:xgk6viue@node-cluster-sriig.mongodb.net/test?retryWrites=true";

var app = express();
var utils = require('./utils');


//secret is used for signing cookies. Its used to parse and match cookie sessions
app.use(cookieParser('secret'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended : true }));
hbs.registerPartials(__dirname+'/views/partials');

app.set('view engine','hbs');
app.use(express.static(__dirname+'/views/public'));
app.use(express.static(__dirname+'/views'));

//added follow


app.get('/', function (request, response) {
    response.render('home.hbs', {
        title: 'Home'
    });
});

app.use('/profile', (request, response, next) => {
    if (request.session.user) {
        next();
    } else {
        response.status(401).send('User not authorized. Please log in.');
    }
});

app.get('/', function (request, response) {
    response.render('home.hbs', {
        title: 'Home'
    });
});

app.get('/register', function (request, response) {
    response.render('register.hbs', {
        title: 'Register'
    });
});

app.get('/succeed/:username', function (request, response) {
    console.log(request.params.username);
    response.render('register_succeed.hbs', {
        title: 'Succeed',
        user: request.params.username
    });
});

app.get('/profile', function (request, response) {
    console.log(request.session.user);
    response.render('profile.hbs', {
        title: 'Account',
        user: request.session.user.username,
        score: request.session.user.score
    });
});

app.get('/game', function (request, response) {
    response.render('game.hbs', {
        title: 'Game',
        user: request.session.user.username,
        score: request.session.user.score
    });
});

app.get('/404', function (request, response) {
    response.send('Page Not Fount');
});

app.post('/create-user', function (request, response) {
    var db = utils.getDB();

    var username = request.body.username;
    var password = request.body.password;
    var password_confirm = request.body.password_confirm;
    var email = request.body.email;
    var token = "";
    var tokenExpires = "";
    var create = 1;

    if (password != password_confirm) {
        response.render('simple_response.hbs', {
            h1: 'Passwords must match'
        });
        create = 0;
    };

    db.collection('users').find({
        email: email
    }).toArray(function (err, result) {
        if (result[0] != null) {
            response.render('simple_response.hbs', {
                h1: 'Email already in use'
            })
            create = 0;
        };
    });

    password = bcrypt.hashSync(password, saltrounds);

    db.collection('users').find({
        username: username
    }).toArray(function (err, result) {
        if (result[0] == null && create == 1) {
            db.collection('users').insertOne({
                username: username,
                password: password,
                email: email,
                token: token,
                tokenExpire: tokenExpires,
                score: 0
            }, (err, result) => {
                if (err) {
                    response.render('simple_response.hbs', {
                        h1: 'Unable to add user'
                    });
                }
                response.redirect(`/succeed/${username}`);
            });
        } else {
            response.render('simple_response.hbs', {
                h1: 'Username not available'
            });
        }
    });

});

app.post('/login-user', function (request, response) {
    var db = utils.getDB();

    var username = request.body.username;
    var password = request.body.password;

    console.log(request);

    db.collection('users').find({
        username: username
    }).toArray(function (err, result) {
        if (result[0] != null) {
            let verify = bcrypt.compareSync(password, result[0].password);
            if (verify) {
                request.session.user = {
                    username: result[0].username,
                    email: result[0].email,
                    id: result[0]._id,
                    token: result[0].token,
                    tokenExpire: result[0].tokenExpire,
                    score: result[0].score,
                };
                response.redirect('/profile');
            } else {
                response.render('simple_response.hbs', {
                    h1: 'Incorrect Password'
                });
            }
        } else {
            response.render('simple_response.hbs', {
                h1: 'Username not found'
            });
        }
    });

});

app.get('/reset-password', function (request, response) {
    response.render('pass_reset.hbs');
});

app.post('/reset', function (request, response) {
    var db = utils.getDB();

    var email = request.body.email;
    var token;


    db.collection('users').find({
        email: email
    }).toArray(function (err, result) {

        if (!result[0]) {
            response.render('simple_response.hbs', {
                h1: 'No account with specified email'
            });
        } else {

            request.session.user = {
                username: result[0].username,
                email: result[0].email,
                id: result[0]._id,
                token: result[0].token,
                tokenExpire: result[0].tokenExpire,
                score: result[0].score,
            };

            crypto.randomBytes(15, function (err, buf) {
                token = buf.toString('hex');

                db.collection('users').updateOne(
                    { email: email },
                    {
                        $set: {
                            token: token,
                            tokenExpire: Date.now() + 3600
                        }
                    }
                )

                request.session.user.token = token
                request.session.user.tokenExpire = Date.now() + 3600
                request.session.save(function (err) {
                    if (err) {
                        console.log(err);
                    }
                })
            });

            var auth = {
                type: 'oauth2',
                user: 'roulettegame.node@gmail.com',
                clientId: process.env.client_id,
                clientSecret: process.env.client_secret,
                refreshToken: process.env.refresh_token,
                accessToken: atoken
            };

            db.collection('users').find({
                email: email
            }).toArray(function (err, result) {
                var mailOptions = {
                    to: result[0].email,
                    from: 'roulettegame.node@gmail.com',
                    subject: 'Password Reset',
                    text: 'The account linked to this email has requested a password reset. Click the following link and enter a new password. \n' + 'localhost:8080' +
                        '/reset/' + request.session.user.token,
                    auth: {
                        user: 'roulettegame.node@gmail.com',
                        refreshToken: process.env.refresh_token,
                        accessToken: atoken
                    }
                };

                console.log(request.session.user.token);

                var transporter = nodemailer.createTransport({
                    service: 'gmail',
                    auth: auth
                });

                transporter.sendMail(mailOptions, (err, response) => {
                    if (err) {
                        console.log(err);
                    }
                });

                if (err) {
                    console.log(err);
                } else {
                    response.render('simple_response.hbs', {
                        h1: 'An email has been sent'
                    });
                }
            });

        }
    });

});

app.get('/reset/:token', function (request, response) {
    var db = utils.getDB();

    db.collection('users').find({
        token: request.params.token
    }).toArray(function (err, result) {
        if (result[0] == null) {
            response.render('simple_response.hbs', {
                h1: 'Invalid Token'
            });
        } else {
            response.render('reset.hbs', {
                username: result[0].username
            });
        }
    });
});

app.post('/reset/:token', function (request, response) {
    var db = utils.getDB();

    var password = request.body.password;
    password = bcrypt.hashSync(password, saltrounds);
    var token = request.params.token;

    db.collection('users').find({
        token: token
    }).toArray(function (err, result) {
        if (result[0] != null) {
            db.collection('users').updateOne(
                { token: token },
                {
                    $set: {
                        password: password
                    }
                }
            );
            response.render('reset_result.hbs', {
                h1: 'Password Reset',
                message: 'Your password has been succesfully reset.'
            });
        } else {
            response.render('reset_result.hbs', {
                h1: 'Invalid Token',
                message: 'You have provided an invalid token. No changes have been made.'
            });
        }
    });
});

// app.get('/clicker',(request, response)=>{
//     if (request.signedCookies.ID == undefined){
//         response.redirect('/')
//     }else {
//         MongoClient.connect(uri, { useNewUrlParser: true }, (err, client) => {
//             var database = client.db("Clicker");
//             database.collection('Scores').findOne({_id: request.signedCookies.ID})
//                 .then(function (doc) {
//                     response.render('clicker.hbs',{
//                         username:doc.Username //send the username to the navbar to the top right 
//                     });
//                 })
//         });
//     }
// });
// //ajax command
// app.get('/getstats',(req,res)=>{
//     MongoClient.connect(uri,{useNewUrlParser: true}, (err,client)=>{
//         var database = client.db('Clicker');
//         database.collection('Scores').find({_id: req.signedCookies.ID}).toArray((err,result)=>{
//             if (err) res.send('Error querying database!');
//             //console.log(result);
//             res.send(result)
//         })
//     })
// });


// app.post('/login',(request,response)=>{
//     MongoClient.connect(uri, { useNewUrlParser: true }, (err, client) => {
//         var database = client.db("Clicker");
//         database.collection('Users').findOne({Username: request.body.Username, Password: request.body.Password})
//             .then(function (doc) {
//                 if(doc == null){
//                     response.render('login.hbs',{
//                         loginmsg: 'Username or Password Incorrect'
//                     });
//                 }else{
//                     response.cookie('ID',doc._id,{signed: true});
//                     response.redirect('/clicker');
//                 }
//             })
//     });
// });

// app.post('/register',(request,response)=>{
//   //creates a user and adds to our mongo database
//    MongoClient.connect(uri, { useNewUrlParser: true }, (err, client) => { //connecting
//         let uid = uuid(); // creates a unique ID
//         var database = client.db("Clicker"); //Connects to our clicker database
//        database.collection('Users').findOne({Username: request.body.Username}) //Check if user already exists
//            .then(function (doc) {
//                if(doc == null){
//                    //'User does not exist'
//                    database.collection("Users").insertOne({
//                        _id: uid,
//                        Username: request.body.Username,   // This inserts the new user into the database. Users collection
//                        Password: request.body.Password
//                    });
//                    database.collection("Scores").insertOne({ //Creates a game state for that user
//                        _id: uid,
//                        Username: request.body.Username,
//                        Clicks: 0, //currency to buy levels 
//                        totalClicks: 0, //total
//                        lvl: 1, //what level user currently is on
//                        Lionel: 0,
//                        Chritiano: 0, //all the scores of the clicker game 
//                        Paul: 0,
//                        Eden: 0, //the autos 
//                        Neymar: 0,
//                        Zlatan: 0
//                    });
//                    //console.log("User added to database");
//                    response.cookie('ID',uid,{signed:true}); //when the user is added it redirects to the game page. Three params; name , value, option
//                    response.redirect('/clicker');
//                }else{
//                    //console.log('Did not write to database');
//                    response.render('login.hbs',{                // If username is already in use redirects to login page again with error message.
//                        Registermsg:'Username already in use!'
//                    });
//                }
//            })
//    });
// });

// app.get('/logout',(req,response)=> {
//     response.clearCookie('ID');// clears the login cookie
//     response.redirect('/')
// });

// //ajax command
// app.get('/getscores',(req,res)=>{
//     MongoClient.connect(uri,{useNewUrlParser: true}, (err,client)=>{
//         var database = client.db('Clicker');
//         database.collection('Scores').find().project({Username: 1, totalClicks: 1, _id: 0}).toArray((err,result)=>{
//             if (err) res.send('Error querying database!');
//             result.sort(function (a,b) {return b.totalClicks - a.totalClicks});
//             res.send(result)
//         })
//     })
// });

// app.get('/leaderboard',(req,res)=>{
//     res.render('leaderboard.hbs');
// });

// //ajax command
// app.post('/update',(req,res)=> {
//     try {
//         let query = {_id: req.signedCookies.ID};
//         let info = {$set:req.body};
//         MongoClient.connect(uri, {useNewUrlParser: true}, (err, client) => {
//             if(err) throw err;
//             var database = client.db("Clicker");
//             database.collection('Scores').updateOne(query, info, function (err, res) {
//                 if (err) throw err;
//             })
//         })
//     }
//     catch (e) {
//         res.redirect('/')
//     }
// });

app.listen(port,() =>{
   console.log((`server is up and listing on port ${port}`))
});