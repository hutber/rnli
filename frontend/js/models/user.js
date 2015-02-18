/**
 * Created by Hutber on 17/02/2015.
 */
module.exports = function(){

	var models = {};

	models.user = Backbone.Model.extend({
		initialize: function(){
			alert("Welcome to this world");
		}
	});

	return models;

};