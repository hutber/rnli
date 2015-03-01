'user strict';

//extend the view with the default home view
module.exports = RN.glb.gvCreator.extend({
	el: '.content',
	templates: {
		home: require('../../../views/trips/tripsCurrent.jade'),
	},
	events: {
		'click .right': 'signupForm',
	},
	render: function () {
		var self = this;
		$.ajax({
			url: RN.glb.url.api + 'returndata',
			//type: 'POST',
			dataType: 'json',
			data: {

			},
			error: function (data) {
				$('.btn.signup').removeAttr('disabled');
				RN.fnc.popups.message.show('Opps, sorry! The registration failed. Please try again?!... - ' + data.bad, 'bad');
			},
			success: function (data) {
				c(data);
				var data = {
					date: RN.user.get('trip').date[0]
				};
				//load data in ejs
				self.$el.html(self.templates.home(data));
			}
		});

	}
});