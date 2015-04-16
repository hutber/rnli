/**
 * Created by Hutber on 17/02/2015.
 */
module.exports = function(){

	//var models = {};

	return Backbone.Model.extend({
		defaults: {
		},
		initialize: function(data){
			this.set(data)
		},

		isToday: function(pageCheck){
			if(typeof pageCheck !== typeof undefined) {
				if (localStorage.ptripwhen === "present" && (window.location.hash === "#currenttrip" || window.location.hash === "#currenttrip")) {
					return true;
				} else {
					return false;
				}
			}else{
				if (localStorage.ptripwhen === "present") {
					return true;
				} else {
					return false;
				}
			}
		},

		isFuture: function(pageCheck){
			if(typeof pageCheck !== typeof undefined) {
				if (localStorage.ptripwhen === "future" && (window.location.hash === "#currenttrip" || window.location.hash === "#currenttrip")) {
					return true;
				} else {
					return false;
				}
			}else{
				if (localStorage.ptripwhen === "future") {
					return true;
				} else {
					return false;
				}
			}
		},

		isNotFuture: function(pageCheck){
			if(typeof pageCheck !== typeof undefined) {
				if (localStorage.ptripwhen !== "future" && (window.location.hash === "#currenttrip" || window.location.hash === "#currenttrip")) {
					return true;
				} else {
					return false;
				}
			}else{
				if (localStorage.ptripwhen !== "future") {
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
			localStorage['ptrip'+type] = RN.fnc.json.convertToString(data);
		},

		resetData : function(){
			var data = this.createDefaults();

			Object.keys(data).forEach(function(item){
				localStorage['ptrip'+item] = null;
			});

			this.initialize();
		},

		changeCatchOrder : function(ev){
			var ev = $(ev.currentTarget);

			//remove selected
			$('.sortoptions .selected').removeClass('selected');
			var itemSelected = ev.addClass('selected').index();

			this.selected = itemSelected;

			RN.user.setCatches(this.reOrderList(ev.data('type')));
			this.render();
		},

		saveNoteToObject: function(type, data){
			var singleNote = {},
				note = {},
				localNotes = RN.previousTrip.get(type);

			if(localNotes !== null){
				singleNote = localNotes
			}

			if(Object.keys(singleNote).length !== 0) {
				note.id = Object.keys(singleNote).length++;
			}else{
				note.id = 0;
			}

			note.date = moment().format('HH:mm');
			note.note = data;
			singleNote[note.id] = note;
			this.saveLocal(type, singleNote)
		},

		prePareDataForDB : function(){

			var data = RN.previousTrip.attributes,
				details = RN.previousTrip.attributes.details,
				rdata = {};

			rdata.trip = {
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

			rdata.notes = RN.previousTrip.attributes.notes;
			rdata.catch = RN.previousTrip.attributes.catch;

			if(typeof localStorage.gps === typeof undefined){
				rdata.gps = {};
			}else {
				rdata.gps = JSON.parse(localStorage.gps);
				localStorage.removeItem('gps');
			}

			return rdata;

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
						RN.trips.saveLocal('notes',data.notes);

						//user data to reload
						RN.user.setCatches('catch',data.catch);

						//Run callback
						callBack();
					}
				}
			});
		}
	});
};