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
				lat: lat,
				long: long
			},
			success: function (data) {
				callBack(data);
			}
		});
	};

	location.getLocation = function(callback){
		var self = this;
		location.lookUp(function(data){
				location.getClosestLocation(data.coords.latitude, data.coords.longitude, function(data){
					callback(data);
					RN.fnc.popups.spinner.hide();
				})
			},
			function(data){
				RN.fnc.popups.spinner.hide();
				RN.fnc.popups.message.show('Please make sure your GPS is turned on and try again', 'bad')
			});
	};

	location.lookUp = function(success, failed){
		RN.fnc.popups.spinner.show('Looking up location', true)
		navigator.geolocation.getCurrentPosition(function(details){
			success(details);
		}, function(details){
			failed(details);
		});
	};
	return location;
}();