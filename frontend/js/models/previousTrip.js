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

		saveCatchToObject: function(type, data){
			var singleCatch = {},
				note = data,
				localCatch = RN.previousTrip.get('catches');

			if(localCatch !== null){
				singleCatch =  localCatch;
			}

			if(Object.keys(singleCatch).length !== 0) {
				note.id = Object.keys(singleCatch).length+1;
			}else{
				note.id = 0;
			}

			note.new = true;
			note.date = moment().format('HH:mm');
			singleCatch[note.id] = note;
			this.saveLocal(type, singleCatch);
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

			note.new = true;
			note.date = moment().format('HH:mm');
			note.note = data;
			singleNote[note.id] = note;
			this.saveLocal(type, singleNote)
		},

		prePareDataForDB : function(){

			var data = RN.previousTrip.attributes,
				rdata = {};

			rdata.notes = RN.previousTrip.attributes.notes;
			rdata.catch = RN.previousTrip.attributes.catches;
			rdata.hazard = RN.previousTrip.attributes.hazard;
			rdata.id = RN.previousTrip.attributes.id;

			return rdata;

		},

		finaliseTrip: function(data, callBack){
			var self = this;
			$.ajax({
				url: RN.glb.url.api + 'editTrip',
				type: 'POST',
				dataType: 'json',
				data: {
					notes: data.notes,
					catch: data.catch,
					hazard: data.hazard,
					id: data.id,
					uid: RN.user.get('uid')
				},
				error: function (data) {
					c('error currenttrip');
				},
				success: function (data) {
					if (data.error) {
						RN.fnc.popups.message.show(data.error, 'bad');
					} else {
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