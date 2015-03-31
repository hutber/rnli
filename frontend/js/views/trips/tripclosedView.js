'user strict';

//extend the view with the default home view
module.exports = RN.glb.gvCreator.extend({
	el: '.content',
	templates: {
		home: require('../../../views/trips/tripclosed.jade'),
	},
	events: {
		'click .retry': 'render',
	},
	render: function () {
		//load data in ejs
		this.$el.html(self.templates.home(currentLocationData));
	}
});