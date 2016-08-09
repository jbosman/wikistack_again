var Sequelize = require('sequelize');
var db = new Sequelize('postgres://localhost:5432/wikistack');

var Page = db.define( 'Page', {

	title: { 	
		type: Sequelize.STRING,
		allowNull: false
	};

	urlTitle: { 	
		type: Sequelize.STRING,
		allowNull: false
	};

	content: { 	
		type: Sequelize.STRING,
		allowNull: false
	};

	status: { 	
		type: Sequelize.ENUM( "open", "close"),
		allowNull: false
	};

});

var User = db.define( 'User', {
	name: { 	
		type: Sequelize.STRING,
		allowNull: false
	};

	email: { 	
		type: Sequelize.STRING,
		allowNull: false
	};

});