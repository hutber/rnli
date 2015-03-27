module.exports = function () {
	'use strict';

	var catchVar = {};

	catchVar.saveLocal = function(name, data){
		RN.currentTrip.saveLocal(name, data);
	};

	catchVar.saveTempCatchToObject = function(data){

		if(typeof localStorage.ctriptmpcatch !== typeof undefined){
			data = JSON.parse(localStorage.ctriptmpcatch)
		}
		catchVar.saveLocal('tmpcatch', data)
	};

	catchVar.saveCatchToObject = function(data){
		var singleCatch = {},
			note = {};

		if(typeof localStorage.ctripcatch !== typeof undefined){
			singleCatch = JSON.parse(localStorage.ctripcatch)
		}

		if(Object.keys(singleCatch).length !== 0) {
			note.id = Object.keys(singleCatch).length++;
		}else{
			note.id = 0;
		}

		note.date = moment().format('HH:mm');
		note.data = data;
		singleCatch[note.id] = note;
		catchVar.saveLocal(singleCatch)
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