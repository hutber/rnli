/**
 * Created by Hutber on 04/02/2015.
 */
'use strict';

require('./core');
require('./router');
RN.mdl = require('./models');
RN.glb = require('./globals');
RN.fnc = require('./functions');
require('./functions/viewSetup');

var init = function(){
	//On page load run onHashChange to update styles/class etc
	RN.fnc.events.onHashChange();

	//Set up hash change for every time it changes
	window.addEventListener("hashchange", RN.fnc.events.onHashChange, false);

	//setup ajax requests
	RN.fnc.events.ajaxSetup();

	//start backbone app
	Backbone.history.start();

	//check GPS
	RN.fnc.events.checkGPS();
};

if(RN.glb.url.envioment === "liveApp"){
	document.addEventListener('deviceready', init, false);
}else{
	$(document).ready(function() {
		init();
	});
}