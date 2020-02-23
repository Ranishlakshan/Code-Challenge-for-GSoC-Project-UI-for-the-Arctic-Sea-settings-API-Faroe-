var express = require('express');
var app = express();

app.get("/",function(req,res){
    res.send("helloww");
})

app.listen(3000,function(){
    console.log('server is up');
})