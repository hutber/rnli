'user strict';

//extend the view with the default home view
module.exports = RN.glb.gvCreator.extend({
	el: '.content',
	views: require('./views')(),
	events: {
		'click div[data-number]': 'moveSlide',
	},
	moveSlide : function(ev){
		var ev = $(ev.currentTarget),
			clickedNumber = ev.data('number');
		
	},
	render: function () {
		c(this.views);
		//load data in ejs
		this.$el.html(this.views.home.view({
				currentView: 1,
				totalNumber: Object.keys(this.views).length
			})
		);
	}
});