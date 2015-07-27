'user strict';

//extend the view with the default home view
module.exports = RN.glb.gvCreator.extend({
	el: '.content',

	templates: {
		home: require('../../../../views/trips/catch/addcatch.jade'),
	},

	events: {
		'click .addcatch': 'moveToCatch',
	},

	saveFirstPageOfCatch : function(){

		var dataToSave = {
			species: $('#species').val(),
			weightType: $('input[name=weightsystem]:checked').val(),
			weight1: $('select[name=lbs]').val(),
			weight2: $('select[name=oz]').val(),
			height1: $('select[name=ft]').val(),
			height2: $('select[name=in]').val(),
			released: $('select[name=released]').val(),
		};

		RN.fnc.catch.saveTempCatchToObject(dataToSave);
		RN.router.navigate('confirmcatch', true);
	},

	moveToCatch : function(ev){
		RN.router.navigate('addcatch', true);
	},

	render: function () {
		var self = this;
		//load data in ejs
		this.$el.html(this.templates.home({
			ldsDefault: -1
		}));
	}
});