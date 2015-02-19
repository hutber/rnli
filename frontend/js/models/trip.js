/**
 * Created by Hutber on 17/02/2015.
 */
module.exports = function(){

	//var models = {};

	return Backbone.Model.extend({
		defaults: {
			name: '',
			date:moment().format(),
			location: {

			},

		},
		initialize: function(){
			alert("Welcome to this world");
		},
	});

	//return models;

};