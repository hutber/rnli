/**
 * Created by Hutber on 06/03/2015.
 */
module.exports = function(){
	'use strict';
	var location = {};

	location.getPostCode = function(postcode, callBack){
		var self = this;
		RN.fnc.popups.errorBlock = false;
		$.ajax({
			url: 'http://api.postcodes.io/postcodes/'+postcode+'/nearest',
			dataType: 'json',
			error: function(data){
				callBack(data);
			},
			success: function (data) {
				callBack(data);
			}
		});
	};

	location.getClosestLocation = function(lat, long, callBack){
		$.ajax({
			url: RN.glb.url.api + 'returndata',
			//type: 'POST',
			dataType: 'json',
			data: {
				latitude: lat,
				longitude: long
			},
			success: function (data) {
				callBack(data);
			}
		});
	};

	location.getLocation = function(callback, cancelBack){
		var self = this;
		location.lookUp(function(data){
				location.getClosestLocation(data.coords.latitude, data.coords.longitude, function(data){
					callback(data);
					c(data);
					RN.fnc.popups.spinner.hide();
				})
			}, cancelBack);
	};

	location.lookUp = function(callBack, cancelBack){
		var self = this;
		RN.fnc.popups.spinner.show('Looking up location');

		navigator.geolocation.watchPosition((function (_this) {
			return function (position) {
				callBack(position);
			};
		})(this), function (error) {
			var errorMsg, errorTitle;
			errorTitle = "Location Services";
			if (error.code === 1) {
				errorMsg = "RNLI App needs access to your location. Please turn on Location Services in your device settings.";
			}
			if (error.code === 2) {
				errorMsg = "This device is unable to retrieve a position. Make sure you are connected to a network";
			}
			if (error.code === 3) {
				errorMsg = "This device is unable to retrieve a position. Make sure you have Location Services enabled for RNLI or turned on";
			}
			if (error.code === 1 || error.code === 2 || error.code === 3) {
				return RN.fnc.popups.Dialog(errorTitle, errorMsg, ['Ok', 'Retry'], function(){
					self.lookUp(callBack);
				}, 'confirm', cancelBack);
			}
		}, {
			enableHighAccuracy: true,
			maximumAge: 20000,
			timeout: 1000
		});
	};
	return location;
}();