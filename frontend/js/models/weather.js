/**
 * Created by Hutber on 17/02/2015.
 */
module.exports = function(){

	//var models = {};

	return Backbone.Model.extend({
		defaults: {
		},
		initialize: function(data){
			this.set(this.createDefaults(data))
		},

		createDefaults: function(data){
			if(data){
				return {
					weatherDetails:data
				}
			}else{
				return RN.fnc.json.rebuildObject({
					date:localStorage.weatherdate,
					location:localStorage.weatherlocation,
					postcode:localStorage.weatherpostcode,
				})
			}
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

//data/val/wxobs/all/xml/capabilities?res=hourly
//data/val/wxmarineobs/all/xml/capabilities?res=hourly
//data/val/wxfcs/all/xml/capabilities?res=3hourly
//data/val/wxfcs/all/xml/capabilities?res=daily
		checkAval : function(type, callBack){
			type = type || 'hourly';
			var kind;

			if(type === "3hourly" || type === "daily"){
				kind = 'wxfcs';
			}else if (type === "hourly"){
				kind = 'wxobs';
			}else if (type === "marine"){
				type = 'hourly';
				kind = 'wxmarineobs';
			}
			callBack = callBack || function(){};
			var url = 'http://datapoint.metoffice.gov.uk/public/data/val/'+kind+'/all/json/capabilities?res='+type+'&key='+RN.glb.DPKey,
				self = this;


			$.ajax({
				url: url,
				dataType: 'json',
				error: function (data) {
					c('error contact');
				},
				success: function (data) {
					self.set('aval', data.Resource.TimeSteps.TS);
					callBack();
				}
			});
		},

		getThreeHour: function(lat, long, callBack){
			$.ajax({
				url: RN.glb.url.api + 'weather/threehour',
				//type: 'POST',
				dataType: 'json',
				data: {
					latitude: lat,
					longitude: long
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
		},

		setWeather: function(data){
			this.set({
				weatherDetails: data
			});
			localStorage.weatherDetails = JSON.stringify(data);
		}
	});
};