'user strict';

//extend the view with the default home view
module.exports = RN.glb.gv.extend({
	el: '.content',
	templates: {
		home: require('../../../views/trips/tripsHome.jade'),
	},
	events: {
		'click .right': 'signupForm',
	},
	render: function () {
		//load data in ejs
		this.$el.html(this.templates.home());
	}
});