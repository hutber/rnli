'user strict';

//extend the view with the default home view
module.exports = RN.glb.gvCreator.extend({
	el: '.content',

	templates: {
		home: require('../../../../../views/trips/catch/confirmcatch.jade'),
	},

	events: {
		'click .catchfishbox': 'viewFishDetails'
	},

	viewFishDetails : function(ev){
		var ev = $(ev.currentTarget);
		ev.toggleClass('down');
	},

	saveCatch : function(){
		RN.glb.backButton = true;
		RN.glb.backButtonLocation = 'tripcatch';
		RN.router.navigate('trippreviouscatchoverview', true);
	},

	render: function () {
		var self = this;
		//load data in ejs
		this.$el.html(this.templates.home(
			RN.previousTrip.get('catches')[Object.keys(RN.previousTrip.get('catches')).length])
		);
	}
});