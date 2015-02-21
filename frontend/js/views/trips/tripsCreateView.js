'user strict';

//extend the view with the default home view
module.exports = RN.glb.gv.extend({
	el: '.content',
	templates: {
		home: require('../../../views/trips/tripsCreate.jade'),
	},
	events: {
		'click .right': 'signupForm',
		'click .yes': 'locationOn',
		'click .no': 'locationOff',
	},
	locationOn: function(ev){
		var ev = $(ev.currentTarget);
		$('.selected').removeClass('selected');
		ev.addClass('selected')
		RN.user.trip = new RN.mdl.location({
		});
	},
	locationOff: function(ev){
		var ev = $(ev.currentTarget);
		$('.selected').removeClass('selected');
		ev.addClass('selected')

	},
	render: function () {
		//load data in ejs
		this.$el.html(this.templates.home());

		//Initiate the datepick
		var picker = new Pikaday({
			field: document.getElementById('dateselector'),
			format: 'MMMM Do YYYY',
			onSelect: function() {
				document.getElementById('date').value = this.getMoment().format();
			}
		});
	}
});