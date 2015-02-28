/**
 * Created by Hutber on 04/02/2015.
 */
'use strict';

require('./core');
require('./router');
RN.mdl = require('./models');
RN.glb = require('./globals');
RN.fnc = require('./functions');

$(document).ready(function() {

	//On page load run onHashChange to update styles/class etc
	RN.fnc.events.onHashChange();

	//Set up hash change for every time it changes
	window.addEventListener("hashchange", RN.fnc.events.onHashChange, false);

	//setup ajax requests
	RN.fnc.events.ajaxSetup();

	//reload users details
	RN.fnc.login.restoreUserFromLocalStorage();

	//set up the global view for all menu items etc
	RN.glb.gv = new RN.glb.gv();
	RN.glb.gv.render();

	require('./functions/viewSetup');

	//start backbone app
	Backbone.history.start();
});