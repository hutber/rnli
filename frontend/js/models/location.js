/**
 * Created by Hutber on 17/02/2015.
 */
module.exports = function(){

	//var models = {};

	return Backbone.Model.extend({
		defaults: {

		},
		initialize: function(){
			this.getLocation(function(data){
				c(this);
				c(data);
			},
			function(data){
				c(data);
				RN.fnc.popups.spinner.hide();
				RN.fnc.popups.message.show('Please make sure your GPS is turned on and try again', 'bad')
			});
		},
		getLocation : function(success, failed){
			RN.fnc.popups.spinner.show('Looking up location', true)
			navigator.geolocation.getCurrentPosition(function(details){
				success(details);
			}, function(details){
				failed(details);
			});
		},
	});

	//return models;

};