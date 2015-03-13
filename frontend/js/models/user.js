/**
 * Created by Hutber on 17/02/2015.
 */
module.exports = function(){

	//var models = {};

	return Backbone.Model.extend({
		defaults: {
			trip:{
				name:null,
				date:null
			},
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
		setLocation: function(data){
			this.set({
				location: data
			})
		}
	});

	//return models;

};