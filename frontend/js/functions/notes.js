module.exports = function () {
	'use strict';

	var notes = {};

	notes.saveLocal = function(data){
		RN.currentTrip.saveLocal('notes', data);
	};

	notes.saveServer = function (data) {
		$.ajax({
			url: RN.glb.url.ajax + 'notes/addNote',
			type: 'POST',
			dataType: 'json',
			data: {
				uid: RN.user.get('uid'),
				note: data
			},
			error: function (data) {
				c(data);
			},
			success: function (data) {
				if (data.error) {
					RN.fnc.popups.message.show(data.error, 'bad');
				} else {
					c(data);
					notes.saveLocal(data);
				}
			}
		});
	}

	return notes;
};