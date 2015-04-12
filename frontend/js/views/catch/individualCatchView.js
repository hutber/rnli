 'user strict';

//extend the view with the default home view
module.exports = RN.glb.gvCreator.extend({
	el: '.content',
	templates: {
		home: require('../../../views/trips/catch/confirmcatch.jade'),
	},
	events: {
		'click .sortoptions div': 'changeCatchOrder',
	},

	render: function () {
		var data = JSON.parse(localStorage.currentCatch);
		//load data in ejs
		this.$el.html(this.templates.home(
			{
				height1: data.ft,
				height2: data.ins,
				released: function () {
					if(data.released){
						return 'yes';
					}else{
						return 'no';
					}
				}(),
				species: data.species,
				weight1: data.lbs,
				weight2: data.oz
			}
		));
	}
});