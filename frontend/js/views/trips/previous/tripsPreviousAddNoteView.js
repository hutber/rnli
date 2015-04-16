'user strict';

//extend the view with the default home view
module.exports = RN.glb.gvCreator.extend({
	el: '.content',

	templates: {
		home: require('../../../../views/trips/previous/previousaddnote.jade'),
	},

	events: {
		"submit #addnotepreviousform": 'saveNote'
	},

	saveNote: function(){
		var note = $('#notetextprevious').val();
		RN.previousTrip.saveNoteToObject('notes', note);
		RN.router.navigate('tripspreviousnote', true);
	},

	render: function () {
		c(this.templates.home());
		this.$el.html(this.templates.home());
	}
});