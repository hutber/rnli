/**
 * Created by Hutber on 10/12/2014.
 */
module.exports =  function() {
	'use strict';
	var globals = require('./globalsVars');

	//Get views ready
	globals.views = [];

	/*==================================================
	 Global View
	 ================================================== */
	globals.gvCreator = Backbone.View.extend({
		el: '.shell',
		events: {
			'click .savenote': 'saveNote',
			'click .nextcatch': 'nextCatch',
			'click .savecatch': 'saveCatch'
		},
		$header: null,
		templates: {
			login: require('../views/shell.jade')
		},
		navigate: function(ev){
			var target = ev.target.hash.substring(1);
			RN.router.navigate(target, true);
			RN.fnc.url.bodyClass(target);
			return false;
		},
		render: function(){
			//render Page
			this.$el.html(this.templates.login());
			this.$header = $('.header .headerbutton');
		},

		///* #Custom events ------------------------------------------------------------------- */
		saveNote : function(){
			RN.glb.views.addNotesView.saveNote();
		},
		nextCatch : function(){
			RN.glb.views.addCatchView.saveFirstPageOfCatch();
		},
		saveCatch : function(){
			RN.glb.views.confirmCatchView.saveCatch();
		},
	});

	//set up the global view for all menu items etc
	globals.gv = new globals.gvCreator();
	globals.gv.render();

	return globals;
}();