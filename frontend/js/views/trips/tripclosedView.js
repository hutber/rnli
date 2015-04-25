'user strict';

//extend the view with the default home view
module.exports = RN.glb.gvCreator.extend({
	el: '.content',
	templates: {
		home: require('../../../views/trips/tripclosed.jade'),
	},
	events: {
		'click .retry': 'render',
		'click .closedTrip input': 'addStarRating',
		'click .saverating': 'saveRating',
	},

	rating: null,

	addStarRating : function(ev){
		var ev = $(ev.currentTarget);

		this.rating = ev.index() / 2;

		$('.saverating').removeClass('none');
	},

	saveRating : function(ev){
		var ev = $(ev.currentTarget),
			self = this;

		$.ajax({
			url: RN.glb.url.api + 'updateRating',
			type: 'POST',
			dataType: 'json',
			data: {
				id: RN.trips.get('trips')[0].id,
				rating: self.rating
			},
			error: function (data) {
				c('error');
			},
			success: function (data) {
				if (data.error) {
					RN.fnc.popups.message.show(data.error, 'bad');
				} else {
					RN.trips.get('trips')[0].rating = ""+data;
					$('.saverating').addClass('none');
				}
			}
		});
	},

	render: function () {

		//get last trip
		var currentTrip = RN.trips.get('trips')[0];

		//output last trip
		this.$el.html(this.templates.home({
			data : currentTrip
		}));
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
			myLatlng = new google.maps.LatLng(currentTrip.latitude, currentTrip.longitude),
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
});