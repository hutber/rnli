/**
 * Created by Hutber on 13/02/2015.
 */
'use strict';
module.exports = {
	onHashChange: function(){
		//make sure we are logged in, if we are not forward back to home page
		RN.fnc.login.checkLoginState();

		//Updated previous hash
		RN.glb.previoushash = RN.glb.hash;

		//c('currentHash: ' + RN.glb.hash);
		//c('newHash: ' + window.location.hash);

		//Update the new hash
		RN.glb.hash = window.location.hash.substring(1);
		if(RN.glb.hash.length === 0) RN.glb.hash = 'index';

		//On page load update body class with current page
		RN.fnc.url.bodyClass(RN.glb.hash, RN.glb.previoushash);

		//Resize the $('page') element
		RN.fnc.heights.changeHeightofContent();
	},
	checkGPS : function(){
		if(RN.glb.url.envioment==="liveApp" && typeof window.plugins.backgroundGeoLocation !== typeof undefined) {
			//Now lets start up GPS tracking
			RN.gps = require('./gps')();
			c('init', RN.currentTrip.get('tid'));
		}
	},
	ajaxSetup: function(){
		//create defaults for all ajax calls within sp
		var timerAjax;
		$( document ).ajaxStart(function() {
			RN.fnc.popups.spinner.show()
			//reset blocker to false so that it is removed as soon as the ajax call has finished
			RN.fnc.popups.errorBlock = false;
			//start timeout call of 5 seconds to see if we should display the "cancel" button
			timerAjax = setTimeout(function(){
				if(RN.fnc.popups.errorBlock===false) {
					//RN.fnc.popups.spinner.hide()
					RN.fnc.popups.spinner.displayCloseButton();
				}
			}, 5000);
		});

		$( document ).ajaxComplete(function( event, request, settings ) {
			RN.fnc.popups.spinner.hide();
			if(RN.fnc.popups.errorBlock) {
				clearTimeout(timerAjax);
				RN.fnc.popups.spinner.hide()
			}
			if(request && request.responseJSON) {
				var status = request.responseJSON.status,
					message = request.responseJSON.message;

				if (status === "fail" && RN.fnc.popups.errorBlock) {
					RN.fnc.popups.message.show(message, 'bad', 2);
					RN.fnc.popups.errorBlock = true;
				}else if(message && status) {
					RN.fnc.popups.message.show(message, status, 2);
				}
			}
		});
		$( document ).ajaxError(function( event, request, settings ) {
			if(RN.fnc.popups.errorBlock) {
				clearTimeout(timerAjax);
				RN.fnc.popups.spinner.hide()
				RN.fnc.popups.message.hide();
				RN.fnc.popups.message.show('An error occured, sorry', 'bad', 2);
			};
		});
	}
}