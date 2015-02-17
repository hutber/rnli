'user strict';

//extend the view with the default home view
module.exports = RN.glb.gv.extend({
	el: '.content',
	templates: {
		home: require('../../views/login/signup.jade'),
		checkmail: require('../../views/email/checkmail.jade'),
	},
	events: {
		'submit .signupForm': 'signupForm',
	},
	validateEmail: function (email) {
		var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		return re.test(email);
	},
	signupForm: function (el) {
		var me = $(el.currentTarget),
			values = me.serializeObject(),
			noerror = true,
			myself = this;
		//check for all errors
		me.find('.error').removeClass('error');
		Object.keys(values).forEach(function(item){
			var element = values[item];
			if(element.length===0){
				$('input[name='+item+'], select[name='+item+']').parent().addClass('error');
				noerror = false;
			}
		});

		if(this.validateEmail(values.email)!==true && values.email.length>0){
			RN.fnc.popups.Dialog('Email Address', 'Please enter a valid email address');
			$('input[name=email]').parent().addClass('error');
			noerror = false;
		}

		if(noerror){
			var values = $(el.currentTarget).serializeObject();

			//Turn off signup button
			$('.btn.signup').attr('disabled','disabled');
			$.ajax({
				url: RN.glb.url.ajax + 'users/reg',
				type: 'POST',
				dataType: 'json',
				data: values,
				error: function (data) {
					$('.btn.signup').removeAttr('disabled');
					RN.fnc.popups.message.showMessage('Opps, sorry! The registration failed. Please try again?!... - ' + data.bad, 'bad');
				},
				success: function (data) {
					c(data);
					//TODO display the error
					if (data.error) {
						RN.fnc.popups.message.showMessage(data.error, 'bad');
						$('.btn.signup').removeAttr('disabled');
					} else {
						RN.fnc.popups.message.showMessage(data.good);
					//	RN.fnc.popups.spinner.showme();
						if(data.good==="Details have been saved"){
							//readd things to localStorage
							//TP.login.buildLocalStorage(values);
							c('save');
						}
						if($('.signup').html() !== "Done") {
							//force login for user
							if (data.good==="Thank you, you have been auto logged in.") {
								RN.fnc.login.doLogin.doAjax({
									'email': data.uname,
									'pword': values.pw
								});
							}else {
								myself.$el.html(myself.templates.checkmail({
									email: values.email,
									uname: data.uname,
									previous: data.previous
								}));
								RN.fnc.titlebar.title('Sign Up Complete');
							}
						}
						$('.btn.signup').removeAttr('disabled');
						if(document.getElementById('pkey')){
							TP.pageLoad('home')
						}
						//RN.fnc.popups.spinner.hideme();
					}
				}
			});
		}
		return false;
	},
	render: function () {
		RN.glb.title = "Sign Up";
		//load data in ejs
		this.$el.html(this.templates.home());
	}
});