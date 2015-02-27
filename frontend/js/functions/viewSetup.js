/**
 * Created by Hutber on 12/02/2015.
 */
module.exports = function () {
	'use strict';
	c(typeof RN.glb);
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
			RN.glb.title = me.title;
			RN.glb.views[me.name].render(param);
		});
	});
}();