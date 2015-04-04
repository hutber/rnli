'user strict';

//extend the view with the default home view
module.exports = RN.glb.gvCreator.extend({
	el: '.content',
	templates: {
		home: require('../../../views/trips/tripsCurrent.jade'),
	},
	map: {},
	events: {
		'click .retry': 'render',
		'click .starttrip': 'start',
		'click .endtrip': 'end',
		'click .closetrip': 'close',
		'click .enlargetrip': 'enlargeMap'
	},

	start : function(ev){
		var ev = $(ev.currentTarget);
		ev.hide();
		$('.endtrip').show();
		$('#start')[0].value = moment().format();
	},
	end : function(ev){
		var ev = $(ev.currentTarget);
		ev.hide();
		$('.endtrip').hide();
		$('.savetrip').show();
		$('#end')[0].value = moment().format();
	},
	close : function(){

		var finalData = RN.currentTrip.prePareDataForDB();
		RN.currentTrip.finaliseTrip(finalData);

		RN.router.navigate('tripclosed', true);
	},
	enlargeMap : function(ev){
		$('#map-canvas').toggleClass('bigmap');
	},

	render: function () {
		if(RN.currentTrip.get('location')===null){
			RN.fnc.popups.message.show('Error', 'bad', 2);
			RN.router.navigate('createtrip', true);
		}else{
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

			if(currentLocationData === 'null'){
				RN.router.navigate('createtrip ', true);
			}else {
				if (currentLocationData.weather[0].Wh > 3) {
					currentLocationData['notsafe'] = 'danger';
				}
				//load in view with data
				self.$el.html(self.templates.home(currentLocationData));
				if (typeof currentLocationData.weather !== typeof undefined || currentLocationData.weather !== null) {
					var styles = [
							{
								"featureType": "administrative",
								"elementType": "labels.text.fill",
								"stylers": [
									{
										"color": "#444444"
									}
								]
							},
							{
								"featureType": "landscape",
								"elementType": "all",
								"stylers": [
									{
										"color": "#f2f2f2"
									}
								]
							},
							{
								"featureType": "poi",
								"elementType": "all",
								"stylers": [
									{
										"visibility": "off"
									}
								]
							},
							{
								"featureType": "road",
								"elementType": "all",
								"stylers": [
									{
										"saturation": -100
									},
									{
										"lightness": 45
									}
								]
							},
							{
								"featureType": "road.highway",
								"elementType": "all",
								"stylers": [
									{
										"visibility": "simplified"
									}
								]
							},
							{
								"featureType": "road.arterial",
								"elementType": "labels.icon",
								"stylers": [
									{
										"visibility": "off"
									}
								]
							},
							{
								"featureType": "transit",
								"elementType": "all",
								"stylers": [
									{
										"visibility": "off"
									}
								]
							},
							{
								"featureType": "water",
								"elementType": "all",
								"stylers": [
									{
										"color": "#a5ddf0"
									},
									{
										"visibility": "on"
									}
								]
							}
						],
						styledMap = new google.maps.StyledMapType(styles, {name: "Styled Map"}),
						myLatlng = new google.maps.LatLng(cords.lat, cords.long),
						mapOptions = {
							zoom: 9,
							center: myLatlng,
							disableDefaultUI: true
						};
					var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

					//Associate the styled map with the MapTypeId and set it to display.
					map.mapTypes.set('map_style', styledMap);
					map.setMapTypeId('map_style');
					var marker = new google.maps.Marker({
						position: myLatlng,
						map: map
					});
				}
			}
			//this.close();
		}
	}
});