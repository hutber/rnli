'user strict';

//extend the view with the default home view
module.exports = RN.gbl.gv.extend({
	el: '.shell',
	templates: {
		home: require('../../views/login/signup.jade'),
	},
	events: {
	},
	render: function () {
		//load data in ejs
		this.$el.html(this.templates.home());
	}
});