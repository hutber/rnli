'user strict';

//extend the view with the default home view
module.exports = RN.glb.gv.extend({
	el: '.content',
	templates: {
		home: require('../../views/login/signup.jade'),
	},
	events: {
	},
	render: function () {
		RN.glb.title = "Sign Up";
		//load data in ejs
		this.$el.html(this.templates.home());
	}
});