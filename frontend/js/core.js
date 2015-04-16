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

		////Details
		//var callerName;
		//try { throw new Error(); }
		//catch (e) { callerName = e.stack.split('\n')[2].split(/\s+/)[2]; }
		//console.info(msg);
		//console.info('^-------'+callerName+'-------^');

		//Simple
		console.info(msg);
	};
} else {
	c = function (msg) {
		debug(msg);
	};
}

/*==================================================
 Order Array Objects
 ================================================== */
var _toString = Object.prototype.toString,
//the default parser function
	_parser = function (x) { return x; },
//gets the item to be sorted
	_getItem = function (x) {
		return this.parser((_toString.call(x) == "[object Object]" && x[this.prop]) || x);
	};

// Creates a sort method in the Array prototype
Object.defineProperty(Array.prototype, "sortBy", {
	configurable: false,
	enumerable: false,
	// @o.prop: property name (if it is an Array of objects)
	// @o.desc: determines whether the sort is descending
	// @o.parser: function to parse the items to expected type
	value: function (o) {
		if (_toString.call(o) != "[object Object]")
			o = {};
		if (_toString.call(o.parser) != "[object Function]")
			o.parser = _parser;
		//if @o.desc is false: set 1, else -1
		o.desc = [1, -1][+!!o.desc];
		return this.sort(function (a, b) {
			a = _getItem.call(o, a);
			b = _getItem.call(o, b);
			return ((a > b) - (b > a)) * o.desc;
			//return o.desc * (a < b ? -1 : +(a > b));
		});
	}
});

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