'user strict';

//extend the view with the default home view
module.exports = RN.glb.gvCreator.extend({
	el: '.content',

	templates: {
		home: require('../../../views/trips/tripsCreate.jade'),
		postCode: require('../../../views/trips/tipsPostCodeResults.jade'),
	},

	events: {
		'click #saveCreateTrip': 'save',
		'click .createnewtrip .yes': 'locationOn',
		'click .createnewtrip .no': 'locationOff',
		'click .createnewtrip .postboxbox': 'lookUpPostCode',
		'keyup .createnewtrip .postcodeform': 'postcode',
		'click .startGPS': 'startgps',
		'click .stopGPS': 'stopgps',
		'keyup #createname, #createdate, #createlocation': 'readyToSave'
	},

	stop : function(ev){
		var ev = $(ev.currentTarget);

		//start gps
		RN.gps.stop();

	},

	startgps : function(ev){
		var ev = $(ev.currentTarget);

		//start gps
		RN.gps.start();

	},

	locationOn: function(ev){
		var ev = $(ev.currentTarget),
			self = this;
		$('.selected').removeClass('selected');
		ev.addClass('selected')
		var tripData = RN.fnc.location.getLocation(
				function(returnData){
					//Save ajax details to localStorage
					RN.currentTrip.saveLocal('details', returnData);

					//Set the hidden input to something
					document.getElementById('createlocation').value = 'something';

					//Check if we can now save
					self.readyToSave();

					//Reset Postcode
					$('.postcodearea').empty();
					document.getElementById('postcode').value = '';
					$('#postcode').removeClass('success');
				}, function(){
					//If the users GPS is turned off put the button back to NO on the "current Loction"
					$('.selected').removeClass('selected');
					$('.locationSelector .no').addClass('selected');
					RN.fnc.popups.spinner.hide();
				}
		);
	},
	locationOff: function(ev){
		if(typeof ev !== typeof undefined) {
			var ev = $(ev.currentTarget);
			$('.selected').removeClass('selected');
			ev.addClass('selected')
		};

		//Remove from local Storage
		localStorage.removeItem('ctriplocation')
		//TODO - remove location from save settings
	},
	postcode : function(ev){
		var ev = $('#postcode');
		var postcode = ev.serializeObject().postcode,
			self = this;

		if(postcode.length > 5) {
			var postcodeResults = RN.fnc.location.getPostCode(postcode, function (data) {
				if (data.status === 200) {
					//save postcode in local storage and model
					RN.currentTrip.saveLocal('postcode', data.result);
					$('.postcodearea').html(self.templates.postCode(data));
				}else{
					$('.postcodearea').html(self.templates.postCode());
				}
			});
		}else{
			$('.postcodearea').html(self.templates.postCode({length:postcode.length}));
		}
		return false;
	},
	lookUpPostCode : function(ev){
		var ev = $(ev.currentTarget),
			currentPostCodeData = RN.currentTrip.get('postcode'),
			self = this;
		//remove success
		$('#postcode').removeClass('success');
		$('.postboxbox').removeClass('selected');

		this.getPostCodeLocation(currentPostCodeData[ev.index()], function(data){
			$('#postcode').addClass('success');
			ev.addClass('selected')
			self.locationOff();
		});
	},
	getPostCodeLocation : function(data, callBack){
		var self = this;
		RN.fnc.location.getClosestLocation(data.latitude, data.longitude, function(data){
			RN.currentTrip.saveLocal('details', data);
			document.getElementById('createlocation').value = 'something';
			self.readyToSave();
			callBack(data);
		});
	},

	save : function(ev){
		var ev = $(ev.currentTarget);
		if(this.readyToSave()){
			var items = this.$el.find('form').serializeObject();
			//Add trips details to local storage for later
			RN.currentTrip.saveLocal('name', items.name);
			RN.currentTrip.saveLocal('date', items.date);
			//Push us onto the next page
			RN.router.navigate('currenttrip',true);
		}
		return false;
	},
	readyToSave : function(){
		var checker = true;
		//Make sure nothing is empty
		if (
			document.getElementById('createname').value.length === 0 ||
			document.getElementById('createdate').value.length === 0 ||
			document.getElementById('createlocation').value.length === 0
		){
			checker = false;
			$('.save').prop('disabled', true)
		}
		//If nothing is empty enable the save button
		if(checker) $('.save').prop('disabled', false)
		//return state of button
		return checker;
	},

	render: function () {
		var self = this;
		//load data in ejs
		this.$el.html(this.templates.home());

		//Initiate the datepick
		var picker = new Pikaday({
			field: document.getElementById('dateselector'),
			format: 'MMMM Do YYYY',
			defaultDate: moment().toDate(),
			onSelect: function() {
				document.getElementById('createdate').value = this.getMoment().format();
				self.readyToSave();
			}
		});
		//set todays date
		document.getElementById('createdate').value = picker.getMoment().format();
		document.getElementById('dateselector').value = picker.getMoment().format('MMMM Do YYYY');


		if(RN.glb.url.envioment==="liveApp") {
			//Now lets start up GPS tracking
			RN.gps = require('../../functions/gps')();
		}
	}
});