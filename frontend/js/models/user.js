/**
 * Created by Hutber on 17/02/2015.
 */
module.exports = function(){

	//var models = {};

	return Backbone.Model.extend({
		defaults: {

		},
		initialize: function(){
			//alert("Welcome to this world");
		},
		setContacts: function(data){
			this.set({
				contacts: data
			})
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