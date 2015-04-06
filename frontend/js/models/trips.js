/**
 * Created by Hutber on 17/02/2015.
 */
module.exports = function(){

	//var models = {};

	return Backbone.Model.extend({
		defaults: {
		},
		initialize: function(data){
			this.set(this.createDefaults(data))
		},
		saveLocal: function(type, data){
			//create object to play with
			var modelObject = {};
			modelObject[type] = data;
			//set models value
			this.set({
				trips:modelObject[type]
			});
			//set local storage for later
			localStorage[type] = RN.fnc.json.convertToString(data);
		},
		createDefaults: function(data){
			c(data);
			if(data){
				return {
					trips:data
				}
			}else{
				return RN.fnc.json.rebuildObject({
					trips:localStorage.trips
				})
			}
		}
	});
};