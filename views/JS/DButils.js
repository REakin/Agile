const MongoClient = require('mongodb').MongoClient

const uri = "mongodb+srv://RJEakin:xgk6viue@node-cluster-sriig.mongodb.net/test?retryWrites=true";

var _db = null;

module.exports.getDb = function () {
    return _db
}

module.exports.init =function (callback) {
    MongoClient.connect(uri,{ useNewUrlParser: true }, function (err, client) {
        if (err){
            return console.log('unable to connect')
        }
        _db = client.db('Clicker');
        console.log('Connected to DB')
    })
};