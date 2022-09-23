var express = require('express');
var app = express();
var bodyParser = require('body-parser')
// var products = require('./products')
app.set('view engine', 'pug');
app.set('views','./views');
var fs = require('fs')
var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://localhost:27017'
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

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
