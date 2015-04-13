'user strict';

//extend the view with the default home view
module.exports = RN.glb.gvCreator.extend({
	el: '.content',
	templates: {
		home: require('../../../views/trips/previousTrip.jade'),
	},
	events: {
	},
	render: function () {

		var data = JSON.parse(localStorage.currentTripView);
			data['previoustrip'] = true;

		this.$el.html(this.templates.home({
			data : data
		}));


		//Rerender navigation if we need to
		//$('.tripfooter:first-child').addClass('disabled');
		//$('.tripfooter').hide();
		//$('.tripfooter.disabled').show();

		$('.middle h1').text(data.area +', '+data.continent);

		var styledMap = new google.maps.StyledMapType(RN.glb.gmapStyles, {name: "Styled Map"}),
			myLatlng = new google.maps.LatLng(data.latitude, data.longitude),
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