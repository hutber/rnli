/**
 * Created by Hutber on 10/12/2014.
 */
'use strict';
module.exports =  function() {
	var globals = {};

	globals.views = [];

	globals.gv = Backbone.View.extend({
		el: '.shell',
		events: {
			//'click a': 'navigate'
		},
		templates: {
			login: require('../views/shell.jade')
		},
		navigate: function(ev){
			//var ev = $(ev.currentTarget);
			//RN.ROUTER.navigate('/www'+ev[0].pathname, true);
			//return false;
		},
		render: function(){
			this.$el.html(this.templates.login());
		}
	});

	return globals;
}();