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
			weight: $('select[name=lbs]').val()+'.'+$('select[name=oz]').val(),
			height: $('select[name=ft]').val()+'.'+$('select[name=in]').val(),
			released: $('select[name=released]').val(),
		};

		c(dataToSave);
		//RN.router.navigate('confirmcatch', true);
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