'user strict';

//extend the view with the default home view
module.exports = RN.glb.gvCreator.extend({
	el: '.content',

	templates: {
		home: require('../../../../views/trips/previous/previousnotes.jade'),
	},

	events: {
		'click .addPreviousNote': 'moveToNote',
	},

	moveToNote : function(ev){
		RN.router.navigate('trippreviousaddnotes', true);
	},

	render: function () {
		var self = this,
			notes;

		//load data in ejs
		this.$el.html(this.templates.home());
	}
});