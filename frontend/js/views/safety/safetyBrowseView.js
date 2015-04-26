'user strict';

//extend the view with the default home view
module.exports = RN.glb.gvCreator.extend({
	el: '.content',
	views: require('./views')(),
	events: {
		'click .safetyarrow:not(.disabled)': 'moveSlide',
	},
	moveSlide : function(ev){
		var ev = $(ev.currentTarget),
			clickedNumber = ev.data('number');
		RN.glb.safety.page = clickedNumber;

		this.render();
	},
	render: function () {
		if(RN.glb.safety.type === null){
			RN.router.navigate('safety', true);
		}else{
			//Work out info about current pages
			var self = this,
				safetyView = this.views[RN.glb.safety.type][RN.glb.safety.page],
				arrayOfViews = this.views[RN.glb.safety.type],
				numberOfViews = arrayOfViews.length,
				page = RN.glb.safety.page,
				previousItem = function(){
						if(page>0) {
							return page-1;
						}else{
							return null;
						}
				}(),
				nextItem = function(){
					if(page < numberOfViews-1) {
						return page + 1;
					}else{
						return null;
					}
				}(),
				detailsToPass = {
					currentView: page+1,
					totalNumber: numberOfViews,
					nextItem: nextItem,
					previousItem: previousItem
				};

			//load data in ejs
			this.$el.html(this.views.home.view(detailsToPass));

			//Update view with our view
			$('.safetyarea').html(safetyView());
			$('.imageContainer').attr('src', 'img/'+$('.image').data('src'))
		}
	}
});