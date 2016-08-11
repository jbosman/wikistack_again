var wikiRouter = require('express').Router();

var models = require('../models');
var Page = models.Page;
var User = models.User;


wikiRouter.get('/', function(req, res, next){
	//res.send("Welcome to the wiki!")

	Page.findAll()
		.then( function(pages){
			res.render('index', {pages: pages});
		})
		.catch(next);
	
});

wikiRouter.post('/', function(req, res, next){
	

	User.findOrCreate({
		where: {
			name: req.body.name,
			email: req.body.email
		}
	}) 
	.then(function(returnedUser){

		var user = returnedUser[0];

		var page = Page.build({
			title: 		req.body.title,
			content: 	req.body.content,
			status: 	req.body.status  
		});

		return page.save().then( function(page){
			return page.setAuthor(user);
		})
	})
	.then(function(page){
		res.redirect(page.route);
	})
	.catch(next);

});

wikiRouter.get('/add', function(req, res, next){
	res.render('addpage');
});

wikiRouter.get('/:wikiPage', function( req, res, next){
	
	Page.findOne( {
		where: { urlTitle: req.params.wikiPage }
	})
	.then(function(page){
		page.getAuthor()
		.then( function(user){
			res.render('wikipage', {
				user: user, 
				page: page 
			});
		})
	})
	.catch(next);
});



module.exports = {
	wikiRouter: wikiRouter
}




