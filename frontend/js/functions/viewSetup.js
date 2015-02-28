/**
 * Created by Hutber on 12/02/2015.
 */
module.exports = function () {
	'use strict';

	//reload users details
	RN.fnc.login.restoreUserFromLocalStorage();
	//set up the global view for all menu items etc
	//	RN.glb.gv = new RN.glb.gvCreator();
	//	RN.glb.gv.render();
	/*==================================================
	 Views Setup
	 ================================================== */
	var currentViews = require('./views')();

	//set up all other views
	currentViews.forEach(function (me) {
		var BackboneView = me.path;
		RN.glb.views[me.name] = new BackboneView();

		//Set up staff views
		RN.router.on('route:' + me.url, function (param) {
			//Update Title
			RN.fnc.titlebar.title(me.title);
			//render page
			RN.glb.views[me.name].render(param);
		});
	});
}();