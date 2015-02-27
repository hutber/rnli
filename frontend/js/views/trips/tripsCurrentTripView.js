'user strict';

//extend the view with the default home view
module.exports = RN.glb.gv.extend({
	el: '.content',
	templates: {
		home: require('../../../views/trips/tripsCurrent.jade'),
	},
	events: {
		'click .right': 'signupForm',
	},
	render: function () {
		c(RN);
		//load data in ejs
		this.$el.html(this.templates.home(RN.user.get('trip')));

	}
});