/**
 * Created by Hutber on 15/02/2015.
 */
module.exports = function(){
	var popups = {};
	
// #Popup message ------------------------------------------------------
	popups.message = {
		timer: null,
		box: $('#messagebox'),
		message: null,
		close: null,
		blocker: false,
		showMessage: function(message, type, duration, blocker) {
			if(message.length > 0) {
				if (!blocker) {
					popups.message.blocker = true;
				} //set block to true and this will auto remove the message after the ajax call has finished.
				this.box.removeAttr('class').addClass('show '+type);

				this.message.html(message);
				if (duration) {
					this.close.hide();
					this.timer = setTimeout(function () {
						popups.message.hideMessage();
					}, duration * 1000);
				}
			};
		},
		hideMessage: function(){
			this.box.removeClass('show');
			this.close.show();
			clearTimeout(this.timer);
		}
	};
	popups.message.message = popups.message.box.find('.message div'); //define message
	popups.message.close = popups.message.box.find('.close'); //define message
	//set up click event to hide
	$('#messagebox').on('click', function(){ popups.message.hideMessage(); });

	// #Spinner ------------------------------------------------------
	popups.spinner = {
		timer: null,
		overlay: $('.overlay'),
		showme: function(message, title, timer){
			if(message === null){
				message = 'Loading...';
			}
			if(timer){
				popups.spinner.timer = window.setTimeout(popups.spinner.displayCloseButton , 5000);
			}
			this.overlay.find('span').text(message);
			this.overlay.addClass('display');
		},
		hideme: function(){
			window.clearTimeout(popups.spinner.timer);
			this.overlay.removeClass('display');
		},
		displayCloseButton: function(){
			popups.spinner.showme();
		}
	};

	/*==================================================
	 Dialogs
	 ================================================== */
	popups.Dialog = function(title, message, button, callback, type){
		if(typeof type === "undefined"){
			type = 'alert';
		}
		if(typeof navigator.notification !== "undefined"){
			navigator.notification[type](message, function(button){
				if(button===2){
					callback();
				}
			}, title, button);
		}else{
			if(type === "alert"){
				alert(title + ' '+ message);
			}else if (type === "confirm"){
				if(confirm(title + ' '+ message)){
					callback();
				}
			}
		}
	};
	
	return popups;
}