/**
 * Created by Hutber on 17/02/2015.
 */
module.exports = function(){

	//var models = {};

	return Backbone.Model.extend({
		defaults: {
			name:null,
			hazard:null,
			date:null,
			location:null,
			postcode: null,
			notes: {}
		},
		initialize: function(data){
			if(data.length > 0) {
				this.set({
					name: data.trip.name,
					location: data.trip.location,
					postcode: data.trip.postcode,
					date: data.trip.date,
					notes: data.trip.notes,
				})
			};
		},
		setLocalStorage: function(){

		},
		setLocation: function(data){
			this.set({
				location: data
			})
		},
		setPostCode: function(data){
			this.set({
				postcode: data
			})
		},
		setTripData: function(data){
			this.set({
				name: data.name,
				location: data.location,
				postcode: data.postcode,
				notes: data.notes,
				date: data.date
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