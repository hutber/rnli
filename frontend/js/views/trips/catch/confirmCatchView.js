'user strict';

//extend the view with the default home view
module.exports = RN.glb.gvCreator.extend({
	el: '.content',

	templates: {
		home: require('../../../../views/trips/catch/confirmcatch.jade'),
	},

	events: {
		'click .addcatch': 'moveToCatch',
	},

	moveToCatch : function(ev){
		RN.router.navigate('addcatch', true);
	},

	render: function () {
		var self = this;
		//load data in ejs
		var viewsData = RN.currentTrip.get('tmpcatch');
		c(viewsData);
		this.$el.html(this.templates.home(viewsData));
	}
});