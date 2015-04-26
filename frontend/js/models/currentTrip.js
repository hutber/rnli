/**
 * Created by Hutber on 17/02/2015.
 */
module.exports = function(){

	//var models = {};

	return Backbone.Model.extend({
		defaults: {
		},
		initialize: function(){
			var data = this.createDefaults();
			this.set(data)
		},

		createDefaults: function(data){
			return RN.fnc.json.rebuildObject({
				tid:localStorage.ctriptid,
				name:localStorage.ctripname,
				tripimage:localStorage.ctriptripimage,
				hazard:localStorage.ctriphazard,
				date:localStorage.ctripdate,
				started:localStorage.ctripstarted,
				details:localStorage.ctripdetails,
				postcode:localStorage.ctrippostcode,
				notes:localStorage.ctripnotes,
				tmpcatch:localStorage.ctriptmpcatch,
				catch:localStorage.ctripcatch,
				when:localStorage.ctripwhen
			})
		},

		isToday: function(pageCheck){
			if(typeof pageCheck !== typeof undefined) {
				if (localStorage.ctripwhen === "present" && (window.location.hash === "#currenttrip" || window.location.hash === "#currenttrip")) {
					return true;
				} else {
					return false;
				}
			}else{
				if (localStorage.ctripwhen === "present") {
					return true;
				} else {
					return false;
				}
			}
		},

		isFuture: function(pageCheck){
			if(typeof pageCheck !== typeof undefined) {
				if (localStorage.ctripwhen === "future" && (window.location.hash === "#currenttrip" || window.location.hash === "#currenttrip")) {
					return true;
				} else {
					return false;
				}
			}else{
				if (localStorage.ctripwhen === "future") {
					return true;
				} else {
					return false;
				}
			}
		},

		isNotFuture: function(pageCheck){
			if(typeof pageCheck !== typeof undefined) {
				if (localStorage.ctripwhen !== "future" && (window.location.hash === "#currenttrip" || window.location.hash === "#currenttrip")) {
					return true;
				} else {
					return false;
				}
			}else{
				if (localStorage.ctripwhen !== "future") {
					return true;
				} else {
					return false;
				}
			}
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

		resetData : function(){
			var data = this.createDefaults();

			Object.keys(data).forEach(function(item){
				localStorage['ctrip'+item] = null;
			});
			this.initialize();
		},

		prePareDataForDB : function(){

			var data = RN.currentTrip.attributes,
				details = RN.currentTrip.attributes.details,
				rdata = {};

			rdata.trip = {
				tid: data.tid || null,
				name: data.name,
				date: data.date[1],
				rating: data.rating || null,
				hazard: data.hazard || null,
				temperature: details.temperature || null,
				visibility: details.visibility || null,
				winddirection: details.winddirection || null,
				weathertype: details.weathertype || null,
				pressure: details.pressure || null,
				pressuretendency: details.pressuretendency || null,
				dewpoint: details.dewpoint || null,
				humidity: details.humidity || null,
				seatemperature: details.seatemperature || null,
				swell: details.swell || null,
				windspeed: details.windspeed || null,
				waveheight: details.waveheight || null,
				waveperiod: details.waveperiod || null
			};

			rdata.location = {
				latitude: details.latitude,
				longitude: details.longitude,
				area: details.area || null,
				continent: details.continent || null,
				country: details.country || null,
				pcode: details.pcode || null
			};

			rdata.notes = RN.currentTrip.attributes.notes;
			rdata.catch = RN.currentTrip.attributes.catch;

			if(typeof localStorage.gps === typeof undefined){
				rdata.gps = {};
			}else {
				rdata.gps = JSON.parse(localStorage.gps);
				localStorage.removeItem('gps');
			}

			return rdata;

		},

		startTrip: function(data, callBack){
			var self = this;
			$.ajax({
				url: RN.glb.url.api + 'addTrip',
				type: 'POST',
				dataType: 'json',
				data: {
					trip: data.trip,
					location: data.location,
					uid: RN.user.get('uid')
				},
				error: function (data) {
					c('error currenttrip');
				},
				success: function (data) {
					//Run callback
					callBack(data);
				}
			});
		},

		finaliseTrip: function(data, callBack){
			var self = this;
			$.ajax({
				url: RN.glb.url.api + 'addTrip',
				type: 'POST',
				dataType: 'json',
				data: {
					trip: data.trip,
					location: data.location,
					notes: data.notes,
					gps: data.gps,
					catch: data.catch,
					uid: RN.user.get('uid')
				},
				error: function (data) {
					c('error currenttrip');
				},
				success: function (data) {
					if (data.error) {
						RN.fnc.popups.message.show(data.error, 'bad');
					} else {
						//remove previous trips data
						self.resetData();

						//save the returned data into our models
						RN.trips.saveLocal('trips',data.trips);

						//save the returned data into our models
						RN.user.setNotes(data.notes);

						//user data to reload
						RN.user.setCatches(data.catch);

						//Run callback
						callBack();
					}
				}
			});
		}
	});
};