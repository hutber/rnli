/**
 * Created by Hutber on 04/02/2015.
 */
'use strict';

require('./core');
require('./router');
RN.gbl = require('./globals');

/*==================================================
 Views
 ================================================== */
var currentViews = [];
currentViews.push(
	{
		name: 'index',
		path: require('./views/indexView'),
		url: 'index'
	},
	{
		name: 'signup',
		path: require('./views/signupView'),
		url: 'signup'
	}
);

//set up the global view for all menu items etc
RN.gbl.gv = new RN.gbl.gv();
RN.gbl.gv.render();

//set up all other views
currentViews.forEach(function(me){
	var BackboneView = me.path;
	RN.gbl.views[me.name] = new BackboneView();

	//Set up staff views
	RN.ROUTER.on('route:'+me.url, function(param){
		RN.gbl.views[me.name].render(param);
	});
});

$(document).ready(function() {
	Backbone.history.handlers.push({
		route: /(.*)/, callback: function (fragment) {
			// problems with `fragment` handled here
		}
	});
	Backbone.history.start(
		{
			//pushState: true,
			//hashChange: false,
			//root: window.location.pathname.replace('/','').split('/')[0]
			root: window.location.pathname.substr(0, window.location.pathname.substr(0, window.location.pathname.lastIndexOf("/")).lastIndexOf("/"))
		});
});

c(RN);