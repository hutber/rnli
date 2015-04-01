'user strict';

//extend the view with the default home view
module.exports = RN.glb.gvCreator.extend({
	el: '.content',
	templates: {
		home: require('../../../views/trips/tripsHome.jade'),
	},
	events: {
		'click .tripHomeBox': 'moveToTrip',
	},
	moveToTrip : function(ev){
		var ev = $(ev.currentTarget);
		c(ev);
	},
	render: function () {
		//load data in ejs
		this.$el.html(this.templates.home());
	}
});