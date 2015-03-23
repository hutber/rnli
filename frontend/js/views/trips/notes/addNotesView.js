'user strict';

//extend the view with the default home view
module.exports = RN.glb.gvCreator.extend({
	el: '.content',

	templates: {
		home: require('../../../../views/trips/note/addnote.jade'),
	},

	events: {
		'keyup #notetext': 'updateNote',
	},

	updateNote : function(ev){
		var ev = $(ev.currentTarget);

		RN.user.setHazardData(ev.val());
	},

	render: function () {
		var self = this;
		//load data in ejs
		this.$el.html(this.templates.home());
	}
});