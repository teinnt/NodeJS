var express = require("express");
var userRoute = require("./routes/user.route")

var port = 3000;

// Template engine
var app = new express();
app.use(express.static('public'));
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.set('view engine', 'pug');
app.set('views', './views');
app.use('/users', userRoute)
app.get('/', (req, res) => res.render('index', { name: 'AAA' }));

app.listen(port, () => console.log("Listenning to port " + port));