'user strict';

//extend the view with the default home view
module.exports = RN.glb.gvCreator.extend({
	el: '.content',

	templates: {
		home: require('../../../../views/trips/note/notes.jade')
	},

	events: {
		'click .addNote': 'moveToNote',
		'click .currentNotes .icon-pencil': 'editNote',
		'click .currentNotes .icon-trash': 'deleteNote',
	},

	editNote : function(ev){
		var ev = $(ev.currentTarget),
			notes = RN.currentTrip.get('notes');


	},

	moveToNote : function(ev){
		RN.router.navigate('addnotes', true);
	},

	render: function () {
		var self = this;

		//load data in ejs
		this.$el.html(this.templates.home());
	}
});