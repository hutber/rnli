'user strict';

//extend the view with the default home view
module.exports = RN.glb.gvCreator.extend({
	el: '.content',

	templates: {
		home: require('../../../../views/trips/catch/confirmcatch.jade'),
	},

	events: {
		'click .catchfishbox': 'viewFishDetails'
	},

	viewFishDetails : function(ev){
		var ev = $(ev.currentTarget);
		ev.toggleClass('down');
	},

	saveCatch : function(){
		RN.fnc.catch.saveCatchToObject(localStorage.ctriptmpcatch);
		RN.router.navigate('catch', true);
	},

	render: function () {
		var self = this;
		//load data in ejs
		var viewsData = RN.currentTrip.get('tmpcatch');
		this.$el.html(this.templates.home(viewsData));
	}
});