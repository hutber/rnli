/**
 * Created by Hutber on 17/02/2015.
 */
module.exports = function(){

	//var models = {};

	return Backbone.Model.extend({
		defaults: {
			name:null,
			date:null,
			location:{},
			postcode: {},
			hazard: {},
			notes: {}
		},
		initialize: function(data){
			if(data.length > 0) {
				this.set({
					name: data.name,
					location: data.location,
					postcode: data.postcode,
					date: data.date,
					notes: data.notes || {},
				})
			};
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
		createDefaults : function(data){
			return this.defaults;
		},
		setTripData: function(data){
			this.set({
				name: data.name,
				location: data.location,
				postcode: data.postcode,
				hazard: data.hazard,
				notes: data.notes,
				date: data.date
			})
		},
		setPostCode: function(data){
			this.set({
				postcode: data
			})
		},
		setHazardData: function(data){
			this.set({
				hazard: data
			})
		},
		setNoteData: function(data){
			this.set({
				notes: data
			})
		}
	});
};