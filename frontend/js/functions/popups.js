/**
 * Created by Hutber on 15/02/2015.
 */
module.exports = function(){
	var popups = {};
	
// #Popup message ------------------------------------------------------
	popups.message = {
		timer: null,
		box: $('messageBox'),
		message: null,
		close: null,
		blocker: false,
		showMessage: function(message, type, duration, blocker) {
			if(message.length > 0) {
				if (!blocker) {
					popups.message.blocker = true;
				} //set block to true and this will auto remove the message after the ajax call has finished.
				this.box.removeAttr('class').addClass(type).addClass('show');

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
	popups.message.message = popups.message.box.find('message'); //define message
	popups.message.close = popups.message.box.find('close'); //define message
	//set up click event to hide
	$('messageBox').on('click', function(){ popups.message.hideMessage(); });

	// #Spinner ------------------------------------------------------
	popups.spinner = {
		timer: null,
		overlay: $('overlay'),
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
	
	return popups;
}