'user strict';

//extend the view with the default home view
module.exports = RN.glb.gvCreator.extend({
	el: '.content',
	templates: {
		home: require('../../../views/about/share.jade'),
	},
	events: {
		'click .aboutshare .facebook': 'facebook',
	},

	facebook : function(ev){
		var ev = $(ev.currentTarget);

		FB.ui({
			method: 'share',
			href: 'http://rnli.mayfieldafc.com/app/www/'
		}, function(data){
			c('fb stuff');
		});
	},

	render: function () {
		//load data in ejs
		this.$el.html(this.templates.home());
	}
});