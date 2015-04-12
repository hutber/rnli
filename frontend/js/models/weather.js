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
		},

		convertWeatherType: function(weatherType){
			switch (parseInt(weatherType)) {
				case 0:
					return"clearnight";
					break;
				case 1:
					return"sunnyday";
					break;
				case 2:
					return"partlycloudynight";
					break;
				case 3:
					return"partlycloudydata";
					break;
				case 4:
					return"notused";
					break;
				case 5:
					return"mist";
					break;
				case 6:
					return"fog";
					break;
				case 7:
					return"cloudy";
					break;
				case 8:
					return"overcast";
					break;
				case 9:
					return"lightrainshowernight";
					break;
				case 10:
					return"lightrainshowerday";
					break;
				case 11:
					return"drizzle";
					break;
				case 12:
					return"lightrain";
					break;
				case 13:
					return"heavyrainshowernight";
					break;
				case 14:
					return"heavyrainshowerday";
					break;
				case 15:
					return"heavyrain";
					break;
				case 16:
					return"sleetshowernight";
					break;
				case 17:
					return"sleetshowernight";
					break;
				case 18:
					return"Sleet";
					break;
				case 19:
					return"hailshowernight";
					break;
				case 20:
					return"hailshowerday";
					break;
				case 21:
					return"hail";
					break;
				case 22:
					return"lightsnowshowernight";
					break;
				case 23:
					return"lightsnowshowerday";
					break;
				case 24:
					return"lightsnow";
					break;
				case 25:
					return"heavysnowshowernight";
					break;
				case 26:
					return"heavysnowshowerday";
					break;
				case 27:
					return"heavysnow";
					break;
				case 28:
					return"thundershowernight";
					break;
				case 29:
					return"thundershowerday";
					break;
				case 30:
					return"thunder";
					break;
				default:
					return"Not available";
			}
		},
	});
};