module.exports = function () {
	'use strict';

	var contact = {};

	contact.saveContacts = function(data){
		localStorage.contacts = JSON.stringify(data);
	};

	return contact;Jami
};