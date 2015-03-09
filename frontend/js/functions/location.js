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
			url: 'http://api.postcodes.io/postcodes/'+postcode,
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

	return location;
}();