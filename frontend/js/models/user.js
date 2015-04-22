/**
 * Created by Hutber on 17/02/2015.
 */
module.exports = function(){

	//var models = {};

	return Backbone.Model.extend({
		defaults: {

		},
		initialize: function(){
		},
		setContacts: function(data){
			this.set({
				contacts: data
			})
		},
		saveLocal: function(type, data){
			//create object to play with
			var modelObject = {};
			modelObject[type] = data;
			//set models value
			this.set(modelObject);
			//set local storage for later
			localStorage[type] = RN.fnc.json.convertToString(data);
		},
		setCatches: function(data){
			this.set({
				catch: data
			})
		},
		setNotes: function(data){
			this.set({
				notes: data
			})
		}
	});
};