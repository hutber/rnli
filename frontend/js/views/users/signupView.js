'user strict';

//extend the view with the default home view
module.exports = RN.glb.gvCreator.extend({
	el: '.content',
	templates: {
		home: require('../../../views/login/signup.jade'),
		checkmail: require('../../../views/email/checkmail.jade'),
	},
	details: {
		contacted: 'checked'
	},
	events: {
		'submit .signupForm': 'signupForm',
		'change .signupForm input': 'saveDetails',
	},

	saveDetails : function(ev){
		var ev = $(ev.currentTarget),
			name = ev.prop('name');

		if(name === "receiveemails" || name === "contacted"){
			if(ev.is(':checked')) {
				this.details[name] = 'checked';
			}else{
				this.details[name] = null;
			}
		}else {
			this.details[name] = ev.val();
		}
	},

	validateEmail: function (email) {
		var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		return re.test(email);
	},
	signupForm: function (el) {
		var me = $(el.currentTarget),
			values = me.serializeObject(),
			noerror = true,
			self = this;

		delete values['contacted'];
		delete values['receiveemails'];

		//check for all errors
		me.find('.error').removeClass('error');
		Object.keys(values).forEach(function(item){
			var element = values[item];
			if(element.length===0){
				$('.signupForm input[name='+item+'],.signupForm select[name='+item+']').parent().addClass('error');
				noerror = false;
			}
		});

		//if(!$('.signupForm .checkbox input').is(':checked')) {
		//	$('.signupForm .checkbox').addClass('error');
		//	noerror = false;
		//}

		if(this.validateEmail(values.email)!==true && values.email.length>0){
			RN.fnc.popups.Dialog('Email Address', 'Please enter a valid email address');
			$('input[name=email]').parent().addClass('error');
			noerror = false;
		}

		if(values.pw!==values.cpw || values.cpw!==values.pw){
			RN.fnc.popups.message.show('Please make sure your passwords match', 'notice');
			$('input[name=pw], input[name=cpw]').parent().addClass('error');
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
					RN.fnc.popups.message.show('Opps, sorry! The registration failed. Please try again?!... - ' + data.bad, 'bad');
				},
				success: function (data) {
					if (data.status !== "good") {
						RN.fnc.popups.message.show(data.message, data.status);
					} else {
						$('.btn.signup').removeAttr('disabled');
						RN.fnc.login.doLogin.doAjax({
							'email': values.email,
							'pword': values.pw
						});
						self.details = {};
					}
				}
			});
		}
		return false;
	},
	render: function () {
		//load data in ejs
		c(this.details);
		this.$el.html(this.templates.home(this.details));
	}
});