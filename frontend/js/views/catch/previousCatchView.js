 'user strict';

//extend the view with the default home view
module.exports = RN.glb.gvCreator.extend({
	el: '.content',
	templates: {
		home: require('../../../views/catch/previousCatch.jade'),
	},
	events: {
		'click .sortoptions div': 'changeCatchOrder',
	},
	changeCatchOrder : function(ev){
		var ev = $(ev.currentTarget);

		//remove selected
		$('.sortoptions .selected').removeClass('selected');
		ev.addClass('selected');
	},

	render: function () {
		//load data in ejs
		this.$el.html(this.templates.home());
	}
});