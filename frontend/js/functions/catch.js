module.exports = function () {
	'use strict';

	var catchVar = {};

	catchVar.saveTempCatchToObject = function(data){
		if(typeof data === typeof undefined){
			data = JSON.parse(localStorage.ctriptmpcatch)
		}
		RN.currentTrip.saveLocal('tmpcatch', data);
	};

	catchVar.saveCatchToObject = function(data){
		var singleCatch = {},
			note = {};

		if(typeof localStorage.ctripcatch !== typeof undefined){
			singleCatch = JSON.parse(localStorage.ctripcatch)
		}

		if(Object.keys(singleCatch).length !== 0) {
			note.id = Object.keys(singleCatch).length+1;
		}else{
			note.id = 0;
		}

		note.date = moment().format('HH:mm');
		note.data = JSON.parse(data);
		singleCatch[note.id] = note;
		RN.currentTrip.saveLocal('catch', singleCatch);
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
					c('ajax');
					RN.currentTrip.saveLocal('trip', singleCatch);
				}
			}
		});
	}

	return catchVar;
};