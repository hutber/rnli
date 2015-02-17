/**
 * Created by Hutber on 16/02/2015.
 */
'use strict';
module.exports = {
	moveToHome: function (reload) {
		if (typeof reload === "undefined") {
			reload = false;
		} //if no reload is passed make it false
		sessionStorage.removeItem('appOpenedFirstTime');
		if (reload) {
			location.reload();
		} else {
			window.location.href = "#home";
		}
	},
	doLogin: {
		doAjax: function (values) {
			$.ajax({
				url: RN.glb.url.ajax + 'users/login',
				type: 'POST',
				dataType: "json",
				data: {
					'email': values.email,
					'pword': values.pword
				},
				error: function (data) {
					if (data.status === 200) {
						RN.fnc.popups.spinner.showme('Still Logging you in...');
//							RN.fnc.login.doLogin.doAjax(values);
					} else {
						RN.fnc.popups.message.showMessage('Sorry Login Failed: ' + data.status, 'bad');
					}
				},
				success: function (data) {
					if(data.confirmed==0) {
						RN.fnc.popups.message.showMessage('Your approval is still pending, please wait until an admin has approved your account.', 'notice');
					}else {
						RN.fnc.login.buildLocalStorage(data);
						RN.fnc.login.doLogin.success(data);
					}
				}
			});
			return false;
		},
		success: function (data) {
			if (data.uid) {
				//we add a session marker to tell the pin view that we are coming from the login and don't display the pin
				sessionStorage.setItem('blockpin', false);
				//Now we load the home page
				RN.fnc.login.moveToHome(true);
			} else {
				RN.fnc.popups.message.showMessage(data.message, 'bad');
			}
		}
	},
	checkPrivateKey: {
		numberOfTrys: 0,
		doAjax: function () {
			$.ajax({
				url: RN.glb.url.ajax + 'users/checkKey',
				type: 'POST',
				dataType: "json",
				data: {
					'ierihias': localStorage.uid,
					'adfbse4': localStorage.pkey
				},
				error: function (data) {
					if (RN.fnc.login.checkPrivateKey.numberOfTrys === 0) {
						RN.fnc.login.checkPrivateKey.numberOfTrys = 1;
						RN.fnc.login.checkPrivateKey.doAjax();
					} else {
						RN.fnc.popups.message.showMessage('There was a network error. Please try again.', 'bad');
						RN.fnc.popups.spinner.hideme();
					}
				},
				success: RN.fnc.login.checkPrivateKey.success
			});
		},
		makeCall: function () {
			RN.fnc.connection.checkConnection();
			if (RN.fnc.connection.connection=== "none") {
				RN.fnc.popups.Dialog('No Internet', 'Please be aware that any logs made at this time will not be sent to the database until you have an active internet connection', ['Get me out of here', 'I understand'], function(){
					RN.fnc.login.moveToHome();
					RN.fnc.popups.spinner.hideme();
				}, 'confirm')
			} else {
				RN.fnc.popups.spinner.showme('Security Checks', 'Looking up');
				RN.fnc.login.checkPrivateKey.doAjax();
			}
		},
		success: function (data) {
			if (data.current === "1") {
				RN.fnc.login.moveToHome();
				RN.fnc.popups.spinner.hideme();
			} else {
				RN.fnc.popups.Dialog('Private Session Key has expired.', 'This is often from logging on a different device. We will log you out for security.');
				//alert('You have logged in somewhere else since using this app. For security we\'ll need to log you out, please log back in after.');
				RN.fnc.login.doLogOut();
			}
		}
	},
	checkLoginState: function () { //We use this state to enable us to use the function on every page load to check if the user is logged in
		var hash = window.location.hash.substring(1);
		var loggedInState = true;
		if (localStorage.getItem('uid') === null) {
			loggedInState = false;
		}

		if (sessionStorage.tmpPin) {
			//Top level, if the user hasn't set a pin number
		} else if (loggedInState && !localStorage.pinNumber) {
			window.location.href = "#setpin";
		} else if (sessionStorage.appOpenedFirstTime && hash !== "pin" && loggedInState) {
			window.location.href = "#pin";
		} else if (loggedInState && (hash === "" || hash === "signup" || hash === "forgotten" || hash === "login")) {
			window.location.href = "#home";
		} else if (!loggedInState && hash === "home") {
			document.location.replace('');
		}
	},
	lookIfWeNeedPin: function () {
		//This checker will active when the app is closed, on repoen this gets set and user has to enter their pin number
		if (typeof sessionStorage.blockpin === "undefined") {
			sessionStorage.setItem('appOpenedFirstTime', true);
		}
		sessionStorage.removeItem('blockpin');
	},
	doLogOut: function(){
		var tmpPin = localStorage.pinNumber;
		localStorage.clear();
		localStorage.setItem('pinNumber', tmpPin);
		document.location.replace('');
		return false;
	}
}