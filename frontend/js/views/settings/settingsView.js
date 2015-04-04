'user strict';

//extend the view with the default home view
module.exports = RN.glb.gvCreator.extend({
	el: '.content',
	templates: {
		home: require('../../../views/user/settings.jade'),
	},
	events: {
		'submit .forgotten': 'forgotten',
	},
	forgotten: function (elem) {
		if($(elem.currentTarget).find('.error').length !== true){
			var values = $(elem.currentTarget).serializeObject();
			if(values.email===""){
				$('input[type=email]').parent().addClass('error');
				return false;
			}else{
				$.ajax({
					url: RN.glb.url.ajax+'users/forgotten',
					type: 'POST',
					dataType: 'json',
					data: {
						'email': values.email,
					},
					error: function(data){
						RN.fnc.popups.message.show('Please make sure your GPS is turned on and try again', 'bad')
						RN.fnc.popups.spinner.hide();
					},
					success: function(data){
						RN.fnc.popups.spinner.hide();
						//if(data.good){
						//	RN.fnc.popups.message.show(data.good);
						//}else{
						//	RN.fnc.popups.message.show(data.bad, 'bad');
						//}
					}
				});
			}
		}
		return false;
	},
	render: function () {
		//load data in ejs
		this.$el.html(this.templates.home());
	}
});