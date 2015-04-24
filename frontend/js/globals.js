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
			'click .savepreviousnote': 'savePreviousNote',
			'click .nextcatch': 'nextCatch',
			'click .savecatch': 'saveCatch',
			'click .trippreviousaddcatch': 'nextPreviousCatch',
			'click .trippreviousconfirmcatch': 'savePreviousCatch',
			'click .tripfooter a': 'updateSelected',
			'click .notice-box': 'openNotice',
			'click .header .left': 'workOutBack'
		},
		$header: null,
		templates: {
			login: require('../views/shell.jade')
		},
		openNotice : function(ev){
			var ev = $(ev.currentTarget),
				type = ev.data('id');
			RN.fnc.notices.open(type);
		},
		updateSelected : function(ev){
			var ev = $(ev.currentTarget);
			$('.tripfooter .selected').removeClass('selected');
			ev.addClass('selected');

		},
		workOutBack : function(ev){
			var ev = $(ev.currentTarget);

			if(window.history.length===0){
				RN.router.navigate('home', true);
			}else if (RN.glb.backButton === true){
				RN.glb.backButton = false;
				RN.router.navigate(RN.glb.backButtonLocation, true);
			}
			else{
				window.history.back()
			}

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
		savePreviousNote : function(){
			RN.glb.views.tripsPreviousAddNote.saveNote();
		},
		nextCatch : function(){
			RN.glb.views.addCatchView.saveFirstPageOfCatch();
		},
		saveCatch : function(){
			RN.glb.views.confirmCatchView.saveCatch();
		},
		nextPreviousCatch : function(){
			RN.glb.views.trippreviousaddCatchView.saveFirstPageOfCatch();
		},
		savePreviousCatch : function(){
			RN.glb.views.trippreviousconfirmCatchView.saveCatch();
		},
	});

	//set up the global view for all menu items etc
	globals.gv = new globals.gvCreator();
	globals.gv.render();

	return globals;
}();