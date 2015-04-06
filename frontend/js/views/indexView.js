'user strict';

//extend the view with the default home view
module.exports = RN.glb.gvCreator.extend({
	el: '.content',
	events: {
		'submit .loginForm ': 'logUserIn',
	},
	templates: {
		login: require('../../views/login/login.jade')
	},
	logUserIn: function (elem) {
		var items = $(elem.currentTarget).find('input'),
			noerror = true;
		items.each(function (himself){
			var myDad = $(this).parent();
			if($(this).val()===""){
				myDad.addClass('error');
				noerror = false;
			}else {
				myDad.removeClass('error');
			}
		});

		if(noerror){
			RN.fnc.popups.spinner.show('Logging you in...');
			RN.fnc.login.doLogin.doAjax($(elem.currentTarget).serializeObject());
		}
		return false;
	},
	render: function(){
		this.$el.html(this.templates.login());
		RN.fnc.login.checkLoginState();
	}
});