var userRoutes = require('express').Router();

var models = require('../models');
var Page = models.Page;
var User = models.User;


userRoutes.get('/', function(req, res, next){
	User.findAll()
	.then(function(users){
		res.render('users', { users: users });
	})
	.catch(next); 
});

userRoutes.get('/:id', function(req, res, next){

	var userPromise = User.findOne({ 
							where: { id: req.params.id  }
						});

	var userPagesPromise = Page.findAll({
								where: { authorId: req.params.id }					
							});

	Promise.all([userPromise, userPagesPromise])
	.then(function(array){
		var user = array[0];
		var pages = array[1];

		res.render('userPages', {
									user: user,
									pages: pages
								})
	})
	.catch(next);

});

module.exports = {
	userRoutes: userRoutes
}

