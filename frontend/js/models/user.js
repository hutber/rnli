/**
 * Created by Hutber on 17/02/2015.
 */
module.exports = function(){

	//var models = {};

	return Backbone.Model.extend({
		defaults: {
			trip:{
				name:null,
				date:null,
				location:null
			},
			postcode: null
		},
		initialize: function(){
			//alert("Welcome to this world");
		},
		savePostCode: function(data){
			this.set({
				postcode: data
			})
		},
		saveData: function(data){
			this.set({
				trip: data
			})
		},
		setLocation: function(data){
			this.set({
				trip: data
			})
		},
	});

	//return models;

};