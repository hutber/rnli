'user strict';

//extend the view with the default home view
module.exports = RN.glb.gvCreator.extend({
	el: '.content',
	templates: {
		home: require('../../../views/trips/tripsCurrent.jade'),
	},
	events: {
		'click .retry': 'render',
		'click .starttrip': 'start',
		'click .endtrip': 'end',
		'click .savetrip': 'end',
	},
	start : function(ev){
		var ev = $(ev.currentTarget);
		ev.hide();
		$('.end').show();
		$('#start')[0].value = moment().format();
	},
	end : function(ev){
		var ev = $(ev.currentTarget);
		ev.hide();
		$('.end').hide();
		$('.save').show();
		$('#end')[0].value = moment().format();
	},
	render: function () {
		var self = this,
			cords = function()
			{
				if (typeof RN.currentTrip.get('location').latitude === typeof undefined) {
					return  {
						lat: RN.currentTrip.get('location').lat,
						long: RN.currentTrip.get('location').long
							}
				}else{
					return  {
						lat: RN.currentTrip.get('location').latitude,
						long: RN.currentTrip.get('location').longitude
					}
				}
			}();

		var currentLocationData = RN.currentTrip.get('location') || {};

		if(typeof currentLocationData === "undefined") {
			RN.fnc.location.getClosestLocation(cords.lat, cords.long, function (data) {
				currentLocationData = data;
			});
		}
		//load data in ejs
		self.$el.html(self.templates.home(currentLocationData));
		if(typeof currentLocationData.weather === typeof undefined || currentLocationData.weather === null){
			c('nothing to get');
		}else {
			var myLatlng = new google.maps.LatLng(cords.lat, cords.long);
			var mapOptions = {
				zoom: 13,
				center: myLatlng,
				disableDefaultUI: true
			};
			var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

			var marker = new google.maps.Marker({
				position: myLatlng,
				map: map
			});
		}
	}
});