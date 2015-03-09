/**
 * Created by Hutber on 17/02/2015.
 */
module.exports = function(){
'use strict';
	//var models = {};

	return Backbone.Model.extend({
		defaults: {
			coords: {}
		},
		initialize: function(callback){
			var self = this;
			this.getLocation(function(data){
				RN.fnc.popups.spinner.hide();
				self.set('coords', data.coords);
				callback(self.get('coords'));
			},
			function(data){
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
		}
	});
	//return models;
};