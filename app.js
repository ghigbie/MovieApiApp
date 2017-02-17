var express = require("express");
var app = express();
var request = require("request");

app.use(express.static("public"));
app.set("view engine", "ejs");


app.get("/", function(req, res){
    res.render("home");
});

app.get("/results", function(req, res){
    request("http://www.omdbapi.com/?s=star", function(error, response, body){
        if(!error && response.statusCode == 200){
            var results = JSON.parse(body);
            res.render("results");
        }
    });
    
});

app.get("*", function(req, res){
   res.render("notFound"); 
});

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("The server is up and running! Yay!!!");
});