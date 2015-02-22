'user strict';

//extend the view with the default home view
module.exports = RN.glb.gv.extend({
	el: '.content',
	templates: {
		home: require('../../../views/trips/tripsCreate.jade'),
	},
	events: {
		'click .right': 'signupForm',
		'click .save': 'save',
		'click .yes': 'locationOn',
		'click .no': 'locationOff',
		'keyup input': 'readyToSave',
	},
	save : function(ev){
		var ev = $(ev.currentTarget);
		if(this.readyToSave()){
			var items = this.$el.find('form').serializeObject();
			c(items.date);
			RN.user.set('')
			localStorage.trip = {
				name: items.name,
				date: items.date[0],
				location: RN.user.get('trip')
			};
			RN.router.navigate('currenttrip',true);
		}
	},
	locationOn: function(ev){
		var ev = $(ev.currentTarget)
			self = this;
		$('.selected').removeClass('selected');
		ev.addClass('selected')
		var tripData = new RN.mdl.location(function(returnData){
			RN.user.setLocation(returnData);
			document.getElementById('location').value = 'something';
			self.readyToSave();
		});
	},
	readyToSave : function(){
		var checker = true;
		if (document.getElementById('name').value.length === 0 || document.getElementById('date').value.length === 0 || document.getElementById('location').value.length === 0){
			checker = false;
		}
		if(checker)
		$('.save').prop('disabled', false)
		return checker;
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