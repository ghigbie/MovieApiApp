var express = require("express");
var app = express();
var request = require("request");

app.use(express.static("public"));
app.set("view engine", "ejs");


app.get("/", function(req, res){
    res.render("search");
});

app.get("/results", function(req, res){
    console.log(req.query.searchTitle);
    var query = req.query.searchTitle;
    var url = "http://www.omdbapi.com/?s=" + query;
    request(url, function(error, response, body){
        if(!error && response.statusCode == 200){
            var data = JSON.parse(body);
            res.render("results", {data: data});
        }
    });
    
});

app.get("*", function(req, res){
   res.render("notFound"); 
});

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("The server is up and running! Yay!!!");
});