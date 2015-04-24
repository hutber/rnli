module.exports = function () {
	'use strict';

	var notices = {};

	notices.open = function(data){
		var item = this.copy(data);
		RN.fnc.popups.Dialog(item.title, item.message, 'CLOSE');
	};

	notices.copy = function(item){
		switch (item) {
		  case "safety-net":
		    return {
			    title: 'SAFETY NET.',
			    message: "Activate your safety net at the start of your trip. If you don't use the app for 4 hours after starting your trip, we'll send you an alert asking you to confirm you're OK. If you don't respond, we'll send a short text to your safety net contacts asking them to get in touch with you. You can set up your safety net in the My Profile section of this app."
		    };
		    break;
		  case "fav-location":
		    return {
			    title: 'FAVOURITE LOCATIONS.',
			    message: "Save your favourite fishing locations so you can plan and start future trips easily."
		    };
		    break;
		  case "track-me":
		    return {
			    title: 'TRACK ME.',
			    message: "Select 'yes' to use our GPS tracker. Choosing 'no' won't track you throughout your trip, but will pin your current location."
		    };
		    break;
		  default:

		}
	};

	return notices;
};