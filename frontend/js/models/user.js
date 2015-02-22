/**
 * Created by Hutber on 17/02/2015.
 */
module.exports = function(){

	//var models = {};

	return Backbone.Model.extend({
		defaults: {
			trip:{}
		},
		initialize: function(){
			//alert("Welcome to this world");
		},
		setLocation: function(data){
			this.set({
				trip: data
			})
		},
	});

	//return models;

};