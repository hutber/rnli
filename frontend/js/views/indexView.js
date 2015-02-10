'user strict';

//extend the view with the default home view
module.exports = Backbone.View.extend({
	el: '.shell',
	events: {
		//'click a': 'navigate'
	},
	templates: {
		login: require('../../views/login/login.jade')
	},
	navigate: function(ev){
		//ev.preventDefault()
		//var ev = $(ev.currentTarget);
		//MT.ROUTER.navigate(ev[0].pathname, true);
	},
	render: function(){
		//load data in ejs
		this.$el.html(this.templates.login({jamie:'cock'}));
	}
});