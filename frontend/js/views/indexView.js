'user strict';

//extend the view with the default home view
module.exports = RN.gbl.gv.extend({
	el: '.content',
	events: {
		//'click a': 'navigate'
	},
	templates: {
		login: require('../../views/login/login.jade')
	},
	render: function(){
		this.$el.html(this.templates.login());
	}
});