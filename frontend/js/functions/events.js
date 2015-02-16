/**
 * Created by Hutber on 13/02/2015.
 */
module.exports = {
	onHashChange: function(){
		//make sure we are logged in, if we are not forward back to home page
		//TP.login.checkLoginState();

		//Updated previous hash
		RN.glb.PREVIOUSHASH = RN.glb.HASH;

		//Update the new hash
		RN.glb.HASH = window.location.hash.substring(1);
		if(RN.glb.HASH.length === 0) RN.glb.HASH = 'index';

		//On page load update body class with current page
		RN.fnc.url.bodyClass(RN.glb.HASH, RN.glb.PREVIOUSHASH);

		//Update Title
		RN.fnc.titlebar.title(RN.glb.title);
		//Resize the $('page') element
		//TP.changeHeightofContent();
	},
	ajaxSetup: function(){
		//create defaults for all ajax calls within sp
		var timerAjax;
		$( document ).ajaxStart(function() {
			SP.UI.message.blocker = false; //reset blocker to false so that it is removed as soon as the ajax call has finished
			timerAjax = setTimeout(function(){
				if(SP.UI.message.blocker===false) {
					SP.UI.message.showMessage('Loading...', 'notice', 40, true)
				}
			}, 300);
		});

		$( document ).ajaxComplete(function( event, request, settings ) {
			if(!SP.UI.message.blocker) { //if blocker is false, remove the loading box
				clearTimeout(timerAjax);
				SP.UI.message.hideMessage();
			}
			if(request && request.responseJSON) {
				var status = request.responseJSON.status,
					message = request.responseJSON.message;

				if (status === "operation_error") {
					SP.UI.message.showMessage(request.responseJSON.message, 'bad', 2);
				}
			}
		});
		$( document ).ajaxError(function( event, request, settings ) {
			if(!SP.UI.message.blocker) {
				clearTimeout(timerAjax);
				SP.UI.overlay.hide();
				SP.UI.message.hideMessage();
				SP.UI.message.showMessage('An error occured, sorry', 'bad', 2);
			};
		});
	}
}