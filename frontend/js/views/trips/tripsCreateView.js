'user strict';

//extend the view with the default home view
module.exports = RN.glb.gvCreator.extend({
	el: '.content',
	templates: {
		home: require('../../../views/trips/tripsCreate.jade'),
		postCode: require('../../../views/trips/tipsPostCodeResults.jade'),
	},
	events: {
		'click .right': 'signupForm',
		'click .save': 'save',
		'click .yes': 'locationOn',
		'click .no': 'locationOff',
		'click .box': 'lookUpPostCode',
		'keyup input': 'readyToSave',
		'submit .postcodeform': 'postcode'
	},
	postcode : function(ev){
		var ev = $('#postcode');
		var postcode = ev.serializeObject().postcode,
			self = this;

		//if(postcode.length > 4) {
			var postcodeResults = RN.fnc.location.getPostCode(postcode, function (data) {
				if (data.status === 200) {
					RN.user.setPostCode(data);
					$('.postcodearea').html(self.templates.postCode(data));
				}else{
					$('.postcodearea').html(self.templates.postCode());
				}
			});
		//}
		return false;
	},
	lookUpPostCode : function(ev){
		var ev = $(ev.currentTarget),
			currentPostCodeData = RN.user.get('postcode').result;
		//remove success
		$('#postcode').removeClass('success');

		this.getLocation(currentPostCodeData[ev.index()], function(data){
			$('.postcodearea').empty();
			$('#postcode').addClass('success');
		});
	},
	getLocation : function(data, callBack){
		var self = this;
		RN.fnc.location.getClosestLocation(data.latitude, data.longitude, function(data){
			RN.user.setLocation(data);
			document.getElementById('location').value = 'something';
			self.readyToSave();
			callBack(data);
		});
	},
	save : function(ev){
		var ev = $(ev.currentTarget);
		if(this.readyToSave()){
			var items = this.$el.find('form').serializeObject();
			//Add trips details to local storage for later
			var tripsDetails = {
				name: items.name,
				date:  items.date,
				location: RN.user.get('location')
			};
			//Save data to user model
			RN.user.setTripData(tripsDetails);
			//Now save to localStorage
			localStorage.trip = JSON.stringify(tripsDetails);
			//Push us onto the next page
			RN.router.navigate('currenttrip',true);
		}
		return false;
	},
	readyToSave : function(){
		var checker = true;
		//Make sure nothing is empty
		if (
			document.getElementById('name').value.length === 0 ||
			document.getElementById('date').value.length === 0 ||
			document.getElementById('location').value.length === 0
		){
			checker = false;
			$('.save').prop('disabled', true)
		}
		//If nothing is empty enable the save button
		if(checker) $('.save').prop('disabled', false)
		//return state of button
		return checker;
	},
	locationOn: function(ev){
		var ev = $(ev.currentTarget),
			self = this;
		$('.selected').removeClass('selected');
		ev.addClass('selected')
		var tripData = RN.fnc.location.getLocation(function(returnData){
			//c(returnData);
			//RN.user.setLocation(returnData);
			RN.user.setLocation(returnData);
			document.getElementById('location').value = 'something';
			self.readyToSave();
		});
	},
	locationOff: function(ev){
		var ev = $(ev.currentTarget);
		$('.selected').removeClass('selected');
		ev.addClass('selected')
		//TODO - remove location from save settings
	},
	render: function () {
		var self = this;
		//load data in ejs
		this.$el.html(this.templates.home());

		//Initiate the datepick
		var picker = new Pikaday({
			field: document.getElementById('dateselector'),
			format: 'MMMM Do YYYY',
			onSelect: function() {
				document.getElementById('date').value = this.getMoment().format();
				self.readyToSave();
			}
		});

		self.postcode();
	}
});