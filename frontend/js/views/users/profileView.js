'user strict';

//extend the view with the default home view
module.exports = RN.glb.gvCreator.extend({
	el: '.content',
	templates: {
		home: require('../../../views/user/profile.jade'),
		contact: require('../../../views/ui/contact.jade'),
	},
	events: {
		'submit .editForm': 'editProfileForm',
		'click .addEcontact': 'addEcontact',
		'click .contactdelete': 'deleteEcontact',
	},
	addEcontact : function(ev){
		var ev = $(ev.currentTarget);
		var ordernumber = $('.contact:last').find('.textnumber').html();
		if(!ordernumber) {
			$('.econtact').after(this.templates.contact({pos:0}))
		}else{
			ordernumber = parseInt(ordernumber);
			$('.contact:last').after(this.templates.contact({pos:ordernumber}))
		}
	},
	deleteEcontact : function(ev){
		var ev = $(ev.currentTarget);
		var ordernumber = $('.contact:last').find('.textnumber').html();
		if(!ordernumber) {
			$('.econtact').after(this.templates.contact({pos:0}))
		}else{
			ordernumber = parseInt(ordernumber);
			$('.contact:last').after(this.templates.contact({pos:ordernumber}))
		}
	},
	validateEmail: function (email) {
		var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		return re.test(email);
	},
	editProfileForm: function (el) {
		var me = $(el.currentTarget),
			values = me.serializeObject(),
			noerror = true,
			myself = this;
			values['uid'] = localStorage.uid

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

		if(values.pw!==values.cpw){
			RN.fnc.popups.message.show('Please make sure your passwords match', 'notice');
			$('input[name=pw]').parent().addClass('error');
			noerror = false;
		}

		if(noerror){
			//Turn off signup button
			//$('.btn.signup').attr('disabled','disabled');
			var newContacts = [];
			Object.keys(values).forEach(function(key){
				if(key.indexOf('new') !== -1 ){
					var itemName = 'item_'+key.slice(-1);
					if(!newContacts[itemName]){
						newContacts[itemName] = {};
					}
					newContacts[itemName][key.slice(0, key.indexOf('_'))] = values[key];
				}
			});

			//Object.keys(newContacts).forEach(function(item){
			//	RN.fnc.user.contacts.saveContact(newContacts[item])
			//});

			$.ajax({
				url: RN.glb.url.ajax + 'users/reg',
				type: 'POST',
				dataType: 'json',
				data: values,
				error: function (data) {
					//$('.btn.signup').removeAttr('disabled');
					RN.fnc.popups.message.show('Opps, sorry! Editing failed. Please try again?!... - ' + data.bad, 'bad');
				},
				success: function (data) {
					if (data.error) {
						RN.fnc.popups.message.show(data.error, 'bad');
						//$('.btn.signup').removeAttr('disabled');
					} else {
						RN.fnc.user.contacts.saveContact(data.contacts)
						$('.btn.signup').text('Saved').addClass('success');
					}
				}
			});
		}
		return false;
	},
	render: function () {
		//load data in ejs
		this.$el.html(this.templates.home());
	}
});