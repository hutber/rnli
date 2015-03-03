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

				if(data.weather === null){
					RN.router.navigate('createtrip', true);
					RN.fnc.popups.message.show('We\'re sorry, but we can not currently get details for this area at this time', 'bad', 4);
				}else {
					//load data in ejs
					self.$el.html(self.templates.home(data));

					var myLatlng = new google.maps.LatLng(RN.user.get('trip').location.latitude, RN.user.get('trip').location.longitude);
					var mapOptions = {
						zoom: 13,
						center: myLatlng,
						disableDefaultUI: true
					};
					var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

					var marker = new google.maps.Marker({
						position: myLatlng,
						map: map,
					});
				}
			}
		});

	}
});