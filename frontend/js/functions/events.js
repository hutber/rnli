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

		//Update the new hash
		RN.glb.hash = window.location.hash.substring(1);
		if(RN.glb.hash.length === 0) RN.glb.hash = 'index';

		//On page load update body class with current page
		RN.fnc.url.bodyClass(RN.glb.hash, RN.glb.previoushash);

		//Update Title
		RN.fnc.titlebar.title(RN.glb.title);
		//Resize the $('page') element
		//TP.changeHeightofContent();
	},
	ajaxSetup: function(){
		//create defaults for all ajax calls within sp
		var timerAjax;
		$( document ).ajaxStart(function() {
			RN.fnc.popups.spinner.show()
			RN.fnc.popups.message.blocker = false; //reset blocker to false so that it is removed as soon as the ajax call has finished
			timerAjax = setTimeout(function(){
				if(RN.fnc.popups.message.blocker===false) {
					RN.fnc.popups.spinner.hide()
				}
			}, 5000);
		});

		$( document ).ajaxComplete(function( event, request, settings ) {
			RN.fnc.popups.spinner.hide();
			if(!RN.fnc.popups.message.blocker) { //if blocker is false, remove the loading box
				clearTimeout(timerAjax);
				RN.fnc.popups.spinner.hide()
			}
			if(request && request.responseJSON) {
				var status = request.responseJSON.status,
					message = request.responseJSON.message;

				if (status === "operation_error") {
					RN.fnc.popups.message.show(request.responseJSON.message, 'bad', 2);
				}
			}
		});
		$( document ).ajaxError(function( event, request, settings ) {
			if(!RN.fnc.popups.message.blocker) {
				clearTimeout(timerAjax);
				RN.fnc.popups.spinner.hide()
				RN.fnc.popups.message.hide();
				RN.fnc.popups.message.show('An error occured, sorry', 'bad', 2);
			};
		});
	}
}