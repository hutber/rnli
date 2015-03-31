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
		saveLocal: function(type, data){
			//create object to play with
			var modelObject = {};
			modelObject[type] = data;
			//set models value
			this.set(modelObject);
			//set local storage for later
			localStorage['ctrip'+type] = RN.fnc.json.convertToString(data);
		},
		createDefaults: function(data){
			return RN.fnc.json.rebuildObject({
				name:localStorage.ctripname,
				hazard:localStorage.ctriphazard,
				date:localStorage.ctripdate,
				location:localStorage.ctriplocation,
				postcode:localStorage.ctrippostcode,
				notes:localStorage.ctripnotes,
				tmpcatch:localStorage.ctriptmpcatch,
				catch:localStorage.ctripcatch,
			})
		},

		prePareDataForDB : function(){

			var data = RN.currentTrip.attributes,
				location = RN.currentTrip.attributes.location,
				weather = RN.currentTrip.attributes.location.weather[0],
				rdata = {};

			rdata.trip = {
				name: data.name,
				date: data.date[1],
				rating: data.rating || null,
				hazard: data.hazard || null,
				temperature: weather.T || null,
				visibility: weather.V || null,
				winddirection: weather.D || null,
				weathertype: weather.W || null,
				pressure: weather.P || null,
				pressuretendency: weather.Pt || null,
				dewpoint: weather.Dp || null,
				humidity: weather.H || null,
				seatemperature: weather.St || null,
				windspeed: weather.S || null,
				waveheight: weather.Wh || null,
				waveperiod: weather.Wp || null,
			};

			rdata.location = {
				lat: location.lat,
				long: location.long,
				area: location.area || null,
				continent: location.continent || null,
				country: location.country || null,
				pcode: location.pcode || null,
			};

			rdata.notes = RN.currentTrip.attributes.notes;
			rdata.catch = RN.currentTrip.attributes.catch;

			return rdata;

		},

		finaliseTrip: function(data){
			c(data);

			$.ajax({
				url: RN.glb.url.api + 'addTrip',
				type: 'POST',
				dataType: 'json',
				data: {
					trip: data.trip,
					location: data.location,
					notes: data.notes,
					catch: data.catch,
					uid: RN.user.get('uid'),
				},
				error: function (data) {
					c(data);
				},
				success: function (data) {
					c(data);
					if (data.error) {
						RN.fnc.popups.message.show(data.error, 'bad');
					} else {
						c(data);
						notes.saveLocal(data);
					}
				}
			});
		},
	});
};