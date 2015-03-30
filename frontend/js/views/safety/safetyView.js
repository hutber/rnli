'user strict';

//extend the view with the default home view
module.exports = RN.glb.gvCreator.extend({
	el: '.content',
	templates: {
		home: require('../../../views/safety/safetyBrowse.jade'),
	},
	events: {
		'click .safetytips li': 'openSafety',
	},

	openSafety : function(ev){
		var ev = $(ev.currentTarget),
			page = ev.index(),
			type = ev.parent().data('type');

		RN.glb.safety.type = ev.parent().data('type');
		RN.glb.safety.page = page;

		RN.router.navigate('safetybrowse', true);
	},
	render: function () {
		this.$el.html(this.templates.home());
	}
});