module.exports = function () {
	'use strict';

	var catchVar = {};

	catchVar.saveLocal = function(data){
		c(data);
		RN.currentTrip.saveLocal('catch', data);
	};

	catchVar.saveNoteToObject = function(data){
		var singleNote = {},
			note = {};

		if(typeof localStorage.ctripcatch !== typeof undefined){
			singleNote = JSON.parse(localStorage.ctripcatch)
		}

		if(Object.keys(singleNote).length !== 0) {
			note.id = Object.keys(singleNote).length++;
		}else{
			note.id = 0;
		}

		note.date = moment().format('HH:mm');
		note.text = data;
		singleNote[note.id] = note;
		catchVar.saveLocal(singleNote)
	};

	catchVar.saveServer = function (data) {
		$.ajax({
			url: RN.glb.url.ajax + 'catch/addNote',
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
					catchVar.saveLocal(data);
				}
			}
		});
	}

	return catchVar;
};