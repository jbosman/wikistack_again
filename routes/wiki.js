var wikiRouter = require('express').Router();

var models = require('../models');
var Page = models.Page;
var User = models.User;

wikiRouter.get('/', function(req, res, next){
	//res.send("Welcome to the wiki!")
	res.redirect('/');
});

wikiRouter.post('/', function(req, res, next){
	//console.log(res.json(req.body));
	//console.log(req.body);
	var page = Page.build({
		title: req.body.title,
		content: req.body.content,
		urlTitle: req.body.title.replace(/\s+/g, '_').replace(/\W/g, '')
	});

	page.save();

	// var user = User.build({
	// 	name: req.body.name,
	// 	email: req.body.email
	// });

	res.redirect('/');
});

wikiRouter.get('/add', function(req, res, next){
	res.render('addpage');
});



module.exports = {
	wikiRouter: wikiRouter
}




