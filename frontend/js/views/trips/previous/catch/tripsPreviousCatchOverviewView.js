 'user strict';

//extend the view with the default home view
module.exports = RN.glb.gvCreator.extend({
	el: '.content',
	templates: {
		home: require('../../../../../views/trips/previous/trippreviousCatch.jade'),
	},
	events: {
	},
	render: function () {
		//load data in ejs
		this.$el.html(this.templates.home({
			catches: RN.previousTrip.get('catches')
		}));

		$('.sortoptions div').eq(this.selected).addClass('selected');
	}
});