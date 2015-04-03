 'user strict';

//extend the view with the default home view
module.exports = RN.glb.gvCreator.extend({
	el: '.content',
	templates: {
		home: require('../../../views/weather/weather.jade'),
	},
	events: {
		'submit .signupForm': 'signupForm',
	},
	render: function () {
		RN.weather = new RN.mdl.weather();
		//load data in ejs
		this.$el.html(this.templates.home());
	}
});