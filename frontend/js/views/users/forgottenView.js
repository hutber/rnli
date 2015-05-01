'user strict';

//extend the view with the default home view
module.exports = RN.glb.gvCreator.extend({
	el: '.content',
	templates: {
		home: require('../../../views/login/forgotten.jade'),
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
					},
					success: function(data){
						if(data.status === "good"){
							RN.router.navigate('', true)
						}
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