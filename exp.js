var MongoClient = require('mongodb').MongoClient
var mongourl = "mongodb://localhost:27017";

MongoClient.connect(mongourl,function(err,con){
    if(err){
        console.log("err",err)
    }
    else{
        var db = con.db('khut')
        db.collection('employees').find().toArray(function(err,data){
            if(err){
                console.log("err",err)
            }
            else{
                console.log(data)
            }
        })
    }
})