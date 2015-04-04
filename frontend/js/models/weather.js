/**
 * Created by Hutber on 17/02/2015.
 */
module.exports = function(){

	//var models = {};

	return Backbone.Model.extend({
		defaults: {
		},
		initialize: function(){
			this.set(this.createDefaults())
		},

		createDefaults: function(data){
			return RN.fnc.json.rebuildObject({
				date:localStorage.weatherdate,
				location:localStorage.weatherlocation,
				postcode:localStorage.weatherpostcode,
			})
		},

		saveLocal: function(type, data){
			//create object to play with
			var modelObject = {};
			modelObject[type] = data;
			//set models value
			this.set(modelObject);
			//set local storage for later
			localStorage['weather'+type] = RN.fnc.json.convertToString(data);
		},

		getThreeHour: function(lat, long, callBack){
			$.ajax({
				url: RN.glb.url.api + 'weather/threehour',
				//type: 'POST',
				dataType: 'json',
				data: {
					lat: lat,
					long: long
				},
				success: function (data) {
					callBack(data);
					RN.fnc.popups.spinner.hide();
				}
			});
		},

		setLocation: function(data){
			this.set({
				location: data
			});
		}
	});
};