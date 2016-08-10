var Sequelize = require('sequelize');
var db = new Sequelize('postgres://localhost:5432/wikistack', { logging: false });

var Page = db.define( 'Page', {

	title: { 	
		type: Sequelize.STRING,
		allowNull: false
	},

	urlTitle: { 	
		type: Sequelize.STRING,
		allowNull: false
	},

	content: { 	
		type: Sequelize.TEXT,
		allowNull: false
	},

	status: { 	
		type: Sequelize.ENUM( "open", "close")
	}

},	
	{
		getterMethods: { /* Page Getter Functions */
			route: function() { return '/wiki/' + this.urlTitle; }
		},

		setterMethods: { /* Page Setter Functions */

		},
	}
);

var User = db.define( 'User', {
	name: { 	
		type: Sequelize.STRING,
		allowNull: false
	},

	email: { 	
		type: Sequelize.STRING,
		allowNull: false,
		unique: true,
		validate: {
			isEmail: true
		}
	}

});

module.exports = {
	Page: Page,
	User: User
};
