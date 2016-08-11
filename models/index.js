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
		hooks: {
			beforeValidate: function(page){
				if(page.title){
					page.urlTitle = page.title.replace(/\s+/g, '_').replace(/\W/g, '');
				}
			}
		},
		getterMethods: { /* Page Getter Functions */
			route: function() { 
				return '/wiki/' + this.urlTitle; 
			}
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
},
	{
		getterMethods: {
			route: function() {
				return '/users/' + this.id;
			}
		},
	}
);

Page.belongsTo(User, { as: 'author' });

module.exports = {
	Page: Page,
	User: User
};
