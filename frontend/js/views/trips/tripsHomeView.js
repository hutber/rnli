'user strict';

//extend the view with the default home view
module.exports = RN.glb.gvCreator.extend({
	el: '.content',
	templates: {
		home: require('../../../views/trips/tripsHome.jade'),
	},
	events: {
		'click .addtrip': 'jamie',
	},
	jamie : function(ev){
		var ev = $(ev.currentTarget);
	},
	render: function () {
		//load data in ejs
		this.$el.html(this.templates.home());
	}
});