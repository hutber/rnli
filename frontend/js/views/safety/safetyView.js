'user strict';

//extend the view with the default home view
module.exports = RN.glb.gvCreator.extend({
	el: '.content',
	templates: {
		home: require('../../../views/safety/safetyBrowse.jade'),
	},
	events: {
		//'click div[data-number]': 'moveSlide',
	},
	render: function () {
		this.$el.html(this.templates.home());
	}
});