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
	selected: 0,
	changeCatchOrder : function(ev){
		var ev = $(ev.currentTarget);

		//remove selected
		$('.sortoptions .selected').removeClass('selected');
		var itemSelected = ev.addClass('selected').index();

		this.selected = itemSelected;

		RN.user.setCatches(this.reOrderList(ev.data('type')));
		this.render();
	},

	reOrderList : function(data){
		return RN.user.get('catch').sortBy({ prop: data }).reverse();
	},

	render: function () {
		c(this.selected);
		//load data in ejs
		this.$el.html(this.templates.home({
			catches: RN.user.get('catch')
		}));

		$('.sortoptions div').eq(this.selected).addClass('selected');
	}
});