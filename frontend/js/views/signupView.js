'user strict';

//extend the view with the default home view
module.exports = RN.glb.gv.extend({
	el: '.content',
	templates: {
		home: require('../../views/login/signup.jade'),
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
			TP.UI.Dialog('Email Address', 'Please enter a valid email address');
			$('input[name=email]').parent().addClass('error');
			noerror = false;
		}

		if(noerror){
			TP.UI.spinner.showme();
			var values = $(el.currentTarget).serializeObject();

			//Turn off signup button
			$('.btn.signup').attr('disabled','disabled');
			$.ajax({
				url: TP.AJAX + 'users/reg',
				type: 'POST',
				dataType: 'json',
				data: values,
				error: function (data) {
					$('.btn.signup').removeAttr('disabled');
					TP.UI.message.showMessage('Opps, sorry! The registration failed. Please try again?!... - ' + data.bad, 'bad');
				},
				success: function (data) {
					//TODO display the error
					if (data.error) {
						TP.UI.spinner.hideme();
						TP.UI.message.showMessage(data.error, 'bad');
						$('.btn.signup').removeAttr('disabled');
					} else {
						TP.UI.message.showMessage(data.good);
						TP.UI.spinner.showme();
						if(data.good==="Details have been saved"){
							//readd things to localStorage
							TP.login.buildLocalStorage(values);
						}
						if($('.signup').html() !== "Done") {
							//force login for user
							if (data.good==="Thank you, you have been auto logged in.") {
								TP.login.doLogin.doAjax({
									'email': data.uname,
									'pword': values.pw
								});
							}else {
								myself.$el.html(myself.checkmail({
									email: values.email,
									uname: data.uname,
									previous: data.previous
								}));
								TP.UI.setTitle('Sign Up Complete');
							}
						}
						$('.btn.signup').removeAttr('disabled');
						if(document.getElementById('pkey')){
							TP.pageLoad('home')
						}
						TP.UI.spinner.hideme();
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