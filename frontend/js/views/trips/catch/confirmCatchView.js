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
		var viewsData = JSON.parse(localStorage.ctriptmpcatch);
		if(viewsData.weightType === "metric"){
			//RN.fnc.heightweight.convertMetric()
			var smallValue = RN.fnc.heightweight.weight.convertToSmallest(viewsData, 'metric');
			var converted = RN.fnc.heightweight.weight.convertToOz(smallValue, 'metric');
			viewsData.weight1 = converted.weight1;
			viewsData.weight2 = converted.weight2;
		}

		localStorage.ctriptmpcatch = JSON.stringify(viewsData);
		RN.fnc.catch.saveCatchToObject(localStorage.ctriptmpcatch);

		//reset datas from previous catch
		localStorage.ctriptmpcatch = null;
		RN.glb.views.addCatchView.image = null;

		//Set up so we can't go backwards again
		RN.glb.backButton = true;
		RN.glb.backButtonLocation = 'tripcatch';

		//move to trip catch home
		RN.router.navigate('tripcatch', true);
	},

	render: function () {
		var self = this;
		var viewsData = RN.currentTrip.get('tmpcatch');
		this.$el.html(this.templates.home(viewsData));
	}
});