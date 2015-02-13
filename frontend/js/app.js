/**
 * Created by Hutber on 04/02/2015.
 */
'use strict';

require('./core');
require('./router');
RN.gbl = require('./globals');
RN.fnc = require('./functions');

$(document).ready(function() {
	//Setup Global Views
	RN.fnc.views();
	Backbone.history.start();

	//Set up hash change for every time it changes
	RN.gbl.events.onHashChange();
	window.addEventListener("hashchange", RN.gbl.events.onHashChange, false);
});