/**
 * Created by Hutber on 08/02/2015.
 */
//Core Librarys
window.$ = require('jquery');
window.Backbone = require('backbone');
Backbone.$ = $;
//require('backbone-deep-model');
window.Pikaday = require('pikaday');

//Addons
window.moment = require('moment');

//Define Global Variable
window.RN = {}; //define RN so we can use it globally

/*==================================================
 Is Mobile - If true then we are a mobile
 ================================================== */
RN.isMobile = true;
if (document.URL.indexOf("www") === 0 || document.URL.indexOf("") !== false) {
	RN.isMobile = false;
}

//# Debug on the page ----------------------------------------------------
function debug (msg) {
	var me = document.getElementsByTagName('debug'),
		myself = me[0].firstElementChild.inRNnerHTML;
	me[0].firstElementChild.innerHTML = myself+'<li>'+ msg +'</li>';
}

/*==================================================
 Bind C to be alert on mobile console.log in desktop
 ================================================== */
window.c = false;
if (typeof console === "object" && typeof console.error === "function" && !RN.isMobile) {
	c = function (msg) {
		var callerName;
		try { throw new Error(); }
		catch (e) { callerName = e.stack.split('\n')[2].split(/\s+/)[2]; }
		console.info(msg);
		console.info('^-------'+callerName+'-------^');
		//console.info(arguments.callee.caller.toString());
	};
} else {
	c = function (msg) {
		debug(msg);
	};
}

/*==================================================
 Error handling on mobile
 ================================================== */
//#alert errors ----------------------------------------------------
if (RN.isMobile){
	window.onerror = function (msg, url, linenumber) {
		c('Type: '+typeof msg +'\nError message: ' + msg + '\nURL: ' + url + '\nLine Number: ' + linenumber);
		return true;
	};
}

//Add function to turn form elements into object
$.fn.serializeObject = function () {
	var o = {};
	var a = this.serializeArray();
	$.each(a, function () {
		if (o[this.name]) {
			if (!o[this.name].push) {
				o[this.name] = [o[this.name]];
			}
			o[this.name].push(this.value || '');
		} else {
			o[this.name] = this.value || '';
		}
	});
	return o;
};