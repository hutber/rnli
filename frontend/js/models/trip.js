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
		initialize: function(){
			//alert("Welcome to this world");
		},
		setPostCode: function(data){
			this.set({
				postcode: data
			})
		},
		setTripData: function(data){
			this.set({
				trip: data
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
		},
		setLocation: function(data){
			this.set({
				location: data
			})
		}
	});
};