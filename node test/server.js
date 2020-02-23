var express = require('express');
var app = express();
var fs = require('fs');
var path = require('path');
var bodyparser = require('body-parser');

app.use(bodyparser());

app.get("/",function(req,res){
    res.sendFile('home.html',{root:__dirname});
    //res.end(JSON.stringify(req.query.name,req.query.age));   
});

app.post("/user",function(req,res){
    //res.sendFile('home.html',{root:__dirname});
    //res.end(JSON.stringify(req.body.email)+" "+JSON.stringify(req.body.password));
    var email = req.body.email;
    var pass = req.body.password;
    console.log(email+" "+pass);
    //var dictstring = JSON.stringify("Email : "+req.body.email+" \ Password :"+req.body.password);
    var dictstring = JSON.stringify({"Email":email,"Password":pass,More_details:{Age:24,Address:[1,2]}}, null, 4);
    //var finalstring = 'email';
    ////finalstring.concat(' : ',email);
    //finalstring.concat('password : ',pass);
    
    fs.writeFile("settings_add.json", dictstring);
    res.sendFile('views/file1.html',{root:__dirname});   
});

app.get(/^(.+)/,function(req,res){
    
    try{
    
        if(fs.statSync(path.join(__dirname,'views',req.params[0]+".html"))){
            res.sendFile(req.params[0]+'.html',{root:path.join(__dirname,'views')});
        }
    }
    catch(error){
        res.sendFile("404.html",{root:path.join(__dirname,'views')});
    }
});

app.listen(3000,function(){
    console.log('server is up');
});