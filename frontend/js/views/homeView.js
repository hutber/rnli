'user strict';

//extend the view with the default home view
module.exports = RN.glb.gv.extend({
	el: '.content',
	events: {
		'click .landingpage > a': 'goTo',
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