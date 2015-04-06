'user strict';

//extend the view with the default home view
module.exports = RN.glb.gvCreator.extend({
	el: '.content',
	templates: {
		home: require('../../../views/trips/tripclosed.jade'),
	},
	events: {
		'click .retry': 'render',
	},
	render: function () {

		var currentTrip = RN.trips.get('trips')[0];

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