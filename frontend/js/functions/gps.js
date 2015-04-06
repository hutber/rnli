module.exports = function () {
	'use strict';

	var gps = {};

	gps.init = function(data){
		var options = {frequency: 3000, enableHighAccuracy: true};
		navigator.geolocation.watchPosition(runtap.util.gps.onSuccess, runtap.util.gps.onError, options);
	};

	return gps;
};