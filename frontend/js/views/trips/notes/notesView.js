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
		var self = this;
		//load data in ejs
		this.$el.html(this.templates.home());
	}
});