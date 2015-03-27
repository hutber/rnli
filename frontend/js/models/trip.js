/**
 * Created by Hutber on 17/02/2015.
 */
module.exports = function(){

	//var models = {};

	return Backbone.Model.extend({
		defaults: {
		},
		initialize: function(){
			this.set(this.createDefaults())
		},
		saveLocal: function(type, data){
			//create object to play with
			var modelObject = {};
			modelObject[type] = data;
			//set models value
			this.set(modelObject);
			//set local storage for later
			localStorage['ctrip'+type] = RN.fnc.json.convertToString(data);
		},
		createDefaults : function(data){
			return RN.fnc.json.rebuildObject({
				name:localStorage.ctripname,
				hazard:localStorage.ctriphazard,
				date:localStorage.ctripdate,
				location:localStorage.ctriplocation,
				postcode:localStorage.ctrippostcode,
				notes:localStorage.ctripnotes,
				tmpcatch:localStorage.ctriptmpcatch,
				catch:localStorage.ctripcatch,
			})
		},
	});
};