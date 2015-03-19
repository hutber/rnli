'user strict';

//extend the view with the default home view
module.exports = RN.glb.gvCreator.extend({
	el: '.content',

	templates: {
		home: require('../../../../views/trips/hazard/addhazard.jade'),
	},

	events: {
		'keyup #hazardtext': 'updateHazard',
	},

	updateHazard : function(ev){
		var ev = $(ev.currentTarget);

		RN.user.setHazardData(ev.val());
	},

	render: function () {
		var self = this;
		//load data in ejs
		this.$el.html(this.templates.home());
	}
});