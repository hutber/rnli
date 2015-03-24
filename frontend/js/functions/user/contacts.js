module.exports = function () {
	'use strict';

	var contact = {};

	contact.saveLocal = function(data){
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

	contact.saveServer = function (data) {
		$.ajax({
			url: RN.glb.url.ajax + 'notes/addContact',
			type: 'POST',
			dataType: 'json',
			data: {
				uid: RN.user.get('uid'),
				name: data.name,
				number: data.number
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
	contact.saveContact = function(data){
		RN.user.setContacts(data)
		localStorage.contacts = JSON.stringify(data);
		c(RN.user.get('contacts'));
	};

	contact.removeContact = function(data){
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