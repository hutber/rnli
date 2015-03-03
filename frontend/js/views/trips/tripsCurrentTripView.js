'user strict';

//extend the view with the default home view
module.exports = RN.glb.gvCreator.extend({
	el: '.content',
	templates: {
		home: require('../../../views/trips/tripsCurrent.jade'),
	},
	events: {
		'click .right': 'signupForm',
	},
	render: function () {
		var self = this;
		$.ajax({
			url: RN.glb.url.api + 'returndata',
			//type: 'POST',
			dataType: 'json',
			data: {
				lat: RN.user.get('trip').location.latitude,
				long: RN.user.get('trip').location.longitude
			},
			success: function (data) {
				c(data);
				//load data in ejs
				self.$el.html(self.templates.home(data));
				//
				//var myOptions = {
				//	center: new google.maps.LatLng(),
				//	zoom: 14,
				//	mapTypeId: google.maps.MapTypeId.ROADMAP,
				//	disableDefaultUI: true
				//};

				//var map = new google.maps.Map(document.getElementById("map"), myOptions);

				var myLatlng = new google.maps.LatLng(RN.user.get('trip').location.latitude,RN.user.get('trip').location.longitude);
				var mapOptions = {
					zoom: 13,
					center: myLatlng,
					disableDefaultUI: true
				}
				var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

				var marker = new google.maps.Marker({
					position: myLatlng,
					map: map,
				});
			}
		});

	}
});