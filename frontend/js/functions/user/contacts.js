module.exports = function () {
	'use strict';

	var contact = {};

	contact.saveContact = function(data){
		var contacts = JSON.parse(localStorage.contacts),
			id = 0;
		if(contacts.length !== 0) {
			id = contacts.length++;
		}
		data.id = id;
		contacts[id] = data;
		localStorage.contacts = JSON.stringify(contacts);
	};

	return contact;
};