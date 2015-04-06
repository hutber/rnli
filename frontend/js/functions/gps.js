module.exports = function () {
	'use strict';

	var gps = {};

	gps.bgGeo = window.plugins.backgroundGeoLocation;

	gps.init = function(data){
		var self = this;
		c(this);

		var callbackFn = function(location){
			self.onBackgroundSuccess(location);
		};

		var failureFn = function(error){
			alert('Geolocation Error');
		};

		this.bgGeo.configure(callbackFn, failureFn, {
			desiredAccuracy: 10,
			stationaryRadius: 10,
			distanceFilter: 30,
			debug: true
		});
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