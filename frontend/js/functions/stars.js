module.exports = function () {
	'use strict';

	var notes = {};

	notes.saveLocal = function(data){
		RN.currentTrip.saveLocal('notes', data);
	};

	notes.saveNoteToObject = function(data){
		var singleNote = {},
			note = {},
			localNotes = (typeof localStorage.ctripnotes !== typeof undefined ? JSON.parse(localStorage.ctripnotes) : {});

		if(localNotes !== null){
			singleNote = localNotes
		}

		if(Object.keys(singleNote).length !== 0) {
			note.id = Object.keys(singleNote).length++;
		}else{
			note.id = 0;
		}

		note.date = moment().format('HH:mm');
		note.note = data;
		singleNote[note.id] = note;
		notes.saveLocal(singleNote)
	};



	notes.cal = function(data){

		var star = data.index() / 2,
			finalStar;

		switch (parseInt(star)) {
			case 4:
				finalStar = 1;
				break;
			case 3:
				finalStar = 2;
				break;
			case 2:
				finalStar = 3;
				break;
			case 1:
				finalStar = 4;
				break;
			default:
				finalStar = 5;
		}
		return finalStar;
	};

	notes.saveRating = function (rating, callBack) {
		$.ajax({
			url: RN.glb.url.api + 'updateRating',
			type: 'POST',
			dataType: 'json',
			data: {
				id: rating.id,
				rating: rating.rating
			},
			error: function (data) {
				c('error');
			},
			success: function (data) {
				if (data.error) {
					RN.fnc.popups.message.show(data.error, 'bad');
				} else {
					callBack(data);
				}
			}
		});
	};

	return notes;
};