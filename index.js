// Review videos
// Part 1 https://www.youtube.com/watch?v=stTJmJ-uGtg
// Part 2 https://www.youtube.com/watch?v=7iPyaokenlg


var bodyParser = require('body-parser');
var express = require('express');
var morgan = require('morgan');
var swig = require('swig');
var chalk = require('chalk');


var wikiRoutes = require('./routes/wiki').wikiRouter;
var models = require('./models');
var Page = models.Page;
var User = models.User;

var app = express();



app.engine('html', swig.renderFile );
swig.setDefaults({ cache: false});
app.set('view engine', 'html');
app.set('views', __dirname + '/views');

app.use(morgan('dev'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/wiki', wikiRoutes);

app.get('/', function(req, res, next ){
	res.send('Welcome to the home page!');
})

function ServerSpeak(str){
	console.log(chalk.blue(str));
};

User.sync({cache: false})
	.then( function( resolved, rejected) {
		return Page.sync({cahce: false});
	})
	.then( function( resolved, rejected) {
		app.listen( 3000, function(){
			ServerSpeak("Sever is up on port 3000...")
		})
	})
	.catch(function(rejected){
		throw new Error(rejected);
	});

