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

	location.getClosestLocation = function(lat, long, time, callBack){
		time = time || null;
		$.ajax({
			url: RN.glb.url.api + 'returnData',
			//type: 'POST',
			dataType: 'json',
			data: {
				latitude: lat,
				longitude: long,
				time: time
			},
			success: function (data) {
				callBack(data);
			}
		});
	};

	location.getLocation = function(callback, cancelBack, time){
		var self = this;
		//Get users Location first
		this.lookUp(
			function(data){
			//Now we have users location look up via ajax the area ID from met office DataPoint
				self.getClosestLocation(data.coords.latitude, data.coords.longitude, time, function(data){
					callback(data);
					RN.fnc.popups.spinner.hide();
				});
			},
			cancelBack
		);
	};

	location.lookUp = function(callBack, cancelBack){
		var self = this,
			options = {
				enableHighAccuracy: true,
				timeout: 10000,
				maximumAge: 0
			};

		RN.fnc.popups.spinner.show('Looking up location');

		navigator.geolocation.getCurrentPosition(
			function(details){
				callBack(details);
			}, function(error){
				var errorMsg, errorTitle;
				errorTitle = "Location Services: "+error.message;
				switch(error.code) {
					case 1:
						errorMsg = "RNLI App needs access to your location. Please turn on Location Services in your device settings."
						break;
					case 2:
						errorMsg = "This device is unable to retrieve a position. Make sure you are connected to a network."
						break;
					case 3:
						errorMsg = "This device is unable to retrieve a position. Make sure you have Location Services enabled for RNLI or turned on."
						break;
					default:
						errorMsg = "An unknown error occurred."
						break;
				}
				RN.fnc.popups.Dialog(errorTitle, errorMsg, ['Ok', 'Retry'], function(){
					self.lookUp(callBack, cancelBack);
				}, 'confirm', cancelBack);
			},
			options
		);
	};
	return location;
}();