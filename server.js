var express = require('express');
var app = express();
var bodyParser = require('body-parser')
var products = require('./products')
app.set('view engine', 'pug');
app.set('views','./views');
var fs = require('fs')
var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://localhost:27017'
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get("/addQuiz",function(req,res){
    res.sendFile(__dirname+"/addQuiz.html")
})
app.post("/addQuiz",function(req,res){
    console.log(req.body)
    MongoClient.connect(url,function(err,con){
        if(err)console.log(err)
        else{
            var db = con.db('khut');
            db.collection('quizes').insertOne(req.body)
            .then((data)=>{res.send("Quiz inserted success")})
            .catch(err=>console.log(err))
        }
    })
})
app.get("/listQuizes",function(req,res){
    MongoClient.connect(url,function(err,con){
        var db = con.db('khut')
        db.collection('quizes').find().toArray().then((data)=>{
            res.render('quizList',{quizes:data})
        })
    })
})
app.get("/quiz/:qtitle",function(req,res){
    MongoClient.connect(url,function(err,con){
        if(err){console.log('err',err)}
        else{
            var db = con.db('khut');
            db.collection('quizes').find({title:req.params.qtitle}).toArray().then((data)=>{
                if(err){console.log('err',err)}
                else{
                    res.render('quiz',{quiz:data[0]})
                }
            })
        }
    })
})
app.post("/evaluateQuiz/:qtitle",function(req,res){
    console.log(req.params)
    console.log(req.body)
    res.send("please wait....")
})
app.get("/employees",function(req,res){
    MongoClient.connect(url,function(err,con){
        if(err){console.log('err',err)}
        else{
            var db = con.db('khut');
            db.collection('employees').find().toArray((err,data)=>{
                if(err){console.log('err',err)}
                else{
                    res.send(data)
                }
            })
        }
    })
})
app.get("/",function(req,res){
    res.sendFile(__dirname+"/mypage.html")
})
app.get("/products",function(req,res){
    res.render('productsHome',{pds:products})
})
app.get("/addProduct",function(req,res){
    res.sendFile(__dirname+"/addProduct.html")
})

app.post("/addProduct",function(req,res){
    products.push(req.body);
    fs.writeFileSync("products.txt",JSON.stringify(products))
    res.send("please wait")
})

app.get("/productDetails/:id",function(req,res){
    var id = req.params.id;
    var selectedProduct = products.find((p)=>{
        if(p.id==id){
            return true;
        }
    })
    res.render('productDetails',{product:selectedProduct})
})

app.listen(5500)
