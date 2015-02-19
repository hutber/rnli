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

		RN.user = new RN.mdl.trip({
			fname: data.fname,
			sname: data.sname,
			email: data.email,
			pkey: data.pkey,
			uid: data.uid,
			version: data.version
		});
	},
	locationOff: function(ev){
		var ev = $(ev.currentTarget);


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