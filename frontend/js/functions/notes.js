module.exports = function () {
	'use strict';

	var notes = {};

	notes.saveLocal = function(data){
		c(data);
		this.saveServer(data)
		//var contacts = JSON.parse(localStorage.contacts),
		//	id = 0;
		//if(contacts.length !== 0) {
		//	id = contacts.length++;
		//}
		//data.id = id;
		//contacts[id] = data;
		//localStorage.contacts = JSON.stringify(contacts);
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
				}
			}
		});
	}

	return notes;
};