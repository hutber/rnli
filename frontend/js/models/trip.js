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
			postcode: null
		},
		initialize: function(data){
			this.set({
				name: data.trip.name,
				location: data.trip.location,
				postcode: data.trip.postcode,
				date: data.trip.date
			})
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
				note: data
			})
		}
	});
};