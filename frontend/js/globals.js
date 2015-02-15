/**
 * Created by Hutber on 10/12/2014.
 */
module.exports =  function() {
	'use strict';
	var globals = require('./globalsVars');
	globals.views = [];
	/*==================================================
	 Global View
	 ================================================== */
	globals.gv = Backbone.View.extend({
		el: '.shell',
		events: {
			//'click a': 'navigate'
		},
		templates: {
			login: require('../views/shell.jade')
		},
		navigate: function(ev){
			var target = ev.target.hash.substring(1);
			RN.ROUTER.navigate(target, true);
			RN.fnc.url.bodyClass(target);
			return false;
		},
		render: function(){
			this.$el.html(this.templates.login());
		}
	});

	return globals;
}();