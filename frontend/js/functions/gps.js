module.exports = function () {
	'use strict';

	var gps = {};

	gps.bgGeo = null;

	gps.init = function(data){
		this.bgGeo = window.plugins.backgroundGeoLocation;

		this.bgGeo.configure(this.callbackFn, this.failureFn, {
			authToken: 'hutber',
			desiredAccuracy: 10,
			stationaryRadius: 10,
			distanceFilter: 30,
			debug: true,
			url: RN.glb.url.ajax + 'api/location/takeGPS',
			notificationTitle: 'Hutber',
			notificationText: 'Jamie',
			activityType: 'AutomotiveNavigation',
			stopOnTerminate: false,
		//  locationTimeout: 10
		});
	};


	gps.callbackFn = function(location){
		this.onBackgroundSuccess(location);
	};

	gps.failureFn = function(error){
		alert('Geolocation Error');
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