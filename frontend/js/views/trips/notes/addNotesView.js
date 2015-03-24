'user strict';

//extend the view with the default home view
module.exports = RN.glb.gvCreator.extend({
	el: '.content',

	templates: {
		home: require('../../../../views/trips/note/addnote.jade'),
	},

	events: {
		"submit #addnoteform": 'saveNote'
	},

	saveNote: function(){
		var note = $('#notetext').val();
		RN.fnc.notes.saveServer(note);
		RN.router.navigate('notes', true)
	},

	render: function () {
		var self = this;
		//load data in ejs
		this.$el.html(this.templates.home());
	}
});