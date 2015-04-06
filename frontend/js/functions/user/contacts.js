module.exports = function () {
	'use strict';

	var contact = {};

	contact.saveContact = function(data){
		RN.user.setContacts(data)
		localStorage.contacts = JSON.stringify(data);
	};

	contact.deleteContactServer = function (data, ev) {
		$.ajax({
			url: RN.glb.url.ajax + 'contacts/deleteContact',
			type: 'POST',
			dataType: 'json',
			data: {
				uid: RN.user.get('uid'),
				id: data
			},
			error: function (data) {
				c('error contact');
			},
			success: function (data) {
				ev.parent().fadeOut();
				contact.saveContact(data.data);

			}
		});
	}

	return contact;
};