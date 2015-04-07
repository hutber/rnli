module.exports = function () {
	'use strict';

	var gps = {};

	gps.bgGeo = null;

	if (window.plugins.backgroundGeoLocation) {
		gps.bgGeo = window.plugins.backgroundGeoLocation;
	}
	setTimeout(function(){
		if(!gps.bgGeo) {
			gps.bgGeo = window.plugins.backgroundGeoLocation;
		}
		//your code to be executed after 1 seconds
	},1000);

	gps.bgGeo.configure(gps.callbackFn, gps.failureFn, {
		authToken: 'hutber',
		desiredAccuracy: 10,
		stationaryRadius: 10,
		distanceFilter: 30,
		debug: true,
		url: RN.glb.url.ajax + 'api/location/takeGPS',
		notificationTitle: 'RNLI',
		notificationText: 'Tracking GPS Coordinates',
		activityType: 'AutomotiveNavigation',
		stopOnTerminate: false,
	//  locationTimeout: 10
	});


	gps.callbackFn = function(location){
		this.onBackgroundSuccess(location);
		console.log('[js] BackgroundGeoLocation callback:  ' + location.latitudue + ',' + location.longitude);
		$.ajax({
			url: RN.glb.url.ajax + 'api/location/takeGPS',
			type: 'POST',
			dataType: "json",
			data: {
				'lat': location.latitudue,
				'long': location.longitude
			},
			error: function (data) {
				c('unsuccess post');
			},
			success: function (data) {
				c('success post');
			}
		});
		gps.bgGeo.finish();
	};

	gps.failureFn = function(error){
		console.log('Geolocation Error');
		gps.bgGeo.finish();
	};

	gps.start = function(data){
		this.bgGeo.start();
},

	gps.stop = function (data) {
		this.bgGeo.stop();
	}

	gps.onBackgroundSuccess = function(cords){
		c(cords);
		c('GPS whayyyy');
	};

	return gps;
};