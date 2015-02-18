/**
 * Created by Hutber on 04/02/2015.
 */
'use strict';

require('./core');
require('./router');
RN.glb = require('./globals');
RN.fnc = require('./functions');
RN.mdl = require('./models');

$(document).ready(function() {
	//start backbone app
	Backbone.history.start();

	//On page load run onHashChange to update styles/class etc
	RN.fnc.events.onHashChange();
	//Set up hash change for every time it changes
	window.addEventListener("hashchange", RN.fnc.events.onHashChange, false);

	//setup ajax requests
	RN.fnc.events.ajaxSetup();
});