'user strict';

//extend the view with the default home view
module.exports = RN.glb.gvCreator.extend({
	el: '.content',
	events: {
		'touchstart .landingpage > a': 'goTo',
	},
	templates: {
		home: require('../../views/home.jade')
	},
	goTo: function(ev){
		var ev = $(ev.currentTarget);
	},
	render: function(){
		this.$el.html(this.templates.home());
	}
});