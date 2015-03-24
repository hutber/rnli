module.exports = function () {
	'use strict';

	var contact = {};

	contact.saveContact = function(data){
		RN.user.setContacts(data)
		localStorage.contacts = JSON.stringify(data);
	};

	contact.deleteContactServer = function (data) {
		$.ajax({
			url: RN.glb.url.ajax + 'contacts/deleteContact',
			type: 'POST',
			dataType: 'json',
			data: {
				uid: RN.user.get('uid'),
				id: data
			},
			error: function (data) {
				c(data);
			},
			success: function (data) {
				contact.saveContact(data.data);
			}
		});
	}

	return contact;
};