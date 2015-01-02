var express = require("express");
var mysql = require("mysql");

var moment = require("moment");
moment.locale("ar");

var formatDate = function(date) {
    return moment(new Date(date)).fromNow();
}

var connection = mysql.createConnection({ host: "localhost", user: "root", password: "", database: "myblog" });
connection.connect();

var app = express();

app.set("view engine", "jade");

app.get("/", function(request, response) {
    connection.query( "SELECT * from `posts` ORDER BY date DESC LIMIT 10;", function(err, posts) {
        response.render("home", { posts: posts, formatDate: formatDate });
    });
    
});

app.get("/posts/:slug", function(request, response) {

    var slug = request.params.slug;
    
    connection.query("SELECT * from `posts` WHERE slug = ?", [ slug ], function(err, rows) {
        var post = rows[0];
        response.render("post", { post: post, formatDate: formatDate });
    });

})

app.listen(3000);