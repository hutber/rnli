'user strict';

//extend the view with the default home view
module.exports = RN.glb.gvCreator.extend({
	el: '.content',

	templates: {
		home: require('../../../../views/trips/note/notes.jade'),
	},

	events: {
		'click .addNote': 'moveToNote',
	},

	moveToNote : function(ev){
		RN.router.navigate('addnotes', true);
	},

	render: function () {
		var self = this,
			notes;

		if(RN.glb.previoushash === "tripsprevious"){
			notes = JSON.parse(localStorage.currentTripView).notes;
		}else{
			notes = RN.currentTrip.get('notes');
		}

		//load data in ejs
		this.$el.html(this.templates.home({
			notes: notes
		}));
	}
});