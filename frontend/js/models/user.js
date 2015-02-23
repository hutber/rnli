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
			}
		},
		initialize: function(){
			//alert("Welcome to this world");
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