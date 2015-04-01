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
		createDefaults: function(data){
			if(data){
				return {
					trips:data
				}
			}else{
				return RN.fnc.json.rebuildObject({
					trips:localStorage.trips,
				})
			}
		},
	});
};