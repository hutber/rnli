/**
 * Created by Hutber on 16/02/2015.
 */
'use strict';
module.exports = {
	moveToHome: function (reload) {
		if (typeof reload === "undefined") {
			reload = false;
		} //if no reload is passed make it false
		if (reload) {
			location.reload();
		} else {
			RN.router.navigate('home', true);
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
						RN.fnc.popups.spinner.show('Still Logging you in...');
					}
				},
				success: function (data) {
					if(data.confirmed==0) {
						RN.fnc.popups.message.show('Your account is currently pending approval. Please be patient', 'notice');
					}else {
						RN.fnc.login.doLogin.success(data);
					}
				}
			});
			return false;
		},
		success: function (data) {
			if (data.token) {
				RN.fnc.login.restoreUserFromLocalStorage(data);
				RN.fnc.login.moveToHome();
			} else {
				RN.fnc.popups.message.show(data.message, 'bad');
			}
		}
	},
	saveLoginDataToLocalStorage : function(data){
		// ## Update localstorage after login
		localStorage.uid = data.uid;
		localStorage.token = data.token;
		localStorage.fname = data.fname;
		localStorage.sname = data.sname;
		localStorage.email = data.email;
		localStorage.version = data.version;
		localStorage.contacts = JSON.stringify(data.contacts);
		localStorage.catch = JSON.stringify(data.catch);
		localStorage.notes = JSON.stringify(data.notes);
		localStorage.trips = JSON.stringify(data.trips);
		localStorage.weatherDetails = JSON.stringify(data.weatherDetails);
	},
	restoreUserFromLocalStorage : function(data){
		var userDataToLoad = {},
			tripDataToLoad = {},
            checker = false;

		//Do this on page reload
        if(typeof data === typeof undefined && typeof localStorage.uid !== typeof undefined){
			userDataToLoad = RN.fnc.json.rebuildObject({
				fname: localStorage.fname,
				sname: localStorage.sname,
				email: localStorage.email,
				token: localStorage.token,
				uid: localStorage.uid,
				version: localStorage.version,
				contacts: localStorage.contacts,
				catch: localStorage.catch,
				currentCatch: localStorage.currentCatch,
				trips: localStorage.trips,
				weatherDetails: localStorage.weatherDetails,
				notes: localStorage.notes
			});
            checker = true;
        //do this on login
		} else if (typeof data !== typeof undefined){
	        userDataToLoad = {
				fname: data.fname,
				sname: data.sname,
				email: data.email,
				token: data.token,
				uid: data.uid,
				version: data.version,
				contacts: data.contacts,
		        catch: data.catch,
		        currentCatch: data.currentCatch,
		        trips: data.trips,
		        weatherDetails: data.weatherDetails,
		        notes: data.notes
			};
            checker = true;
		}

        if(checker) {
            //Start model's before deleting
	        RN.trips = new RN.mdl.trips(userDataToLoad.trips);
	        RN.weather = new RN.mdl.weather(userDataToLoad.weatherDetails);

            //backup again to local storage
            RN.fnc.login.saveLoginDataToLocalStorage(userDataToLoad);

	        //delete trips so it doesn't end up in the user model
	        delete userDataToLoad.trips;
	        delete userDataToLoad.weatherDetails;

	        //Add data to user and a trip
	        RN.user = new RN.mdl.user(userDataToLoad);

	        //Start other models
	        RN.currentTrip = new RN.mdl.currentTrip();
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
						RN.fnc.popups.message.show('There was a network error. Please try again.', 'bad');
						RN.fnc.popups.spinner.hide();
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
					RN.fnc.popups.spinner.hide();
				}, 'confirm')
			} else {
				RN.fnc.popups.spinner.show('Security Checks', 'Looking up');
				RN.fnc.login.checkPrivateKey.doAjax();
			}
		},
		success: function (data) {
			if (data.current === "1") {
				RN.fnc.login.moveToHome();
				RN.fnc.popups.spinner.hide();
			} else {
				RN.fnc.popups.Dialog('Private Session Key has expired.', 'This is often from logging on a different device. We will log you out for security.');
				//alert('You have logged in somewhere else since using this app. For security we\'ll need to log you out, please log back in after.');
				RN.fnc.login.doLogOut();
			}
		}
	},
	checkLoginState: function () { //We use this state to enable us to use the function on every page load to check if the user is logged in

		//check GPS
		RN.fnc.events.checkGPS();

		var hash = window.location.hash.substring(1),
            logInOrOutChecker = (hash === "" || hash === "signup" || hash === "forgotten" || hash === "login");

		var loggedInState = true;
		if (localStorage.getItem('uid') === null) {
			loggedInState = false;
		}

		if(typeof localStorage.gps !== typeof undefined && loggedInState){
			RN.router.navigate('currenttrip', true);
		} else if (loggedInState && logInOrOutChecker) {
			RN.router.navigate('home', true);
		} else if (!loggedInState && !logInOrOutChecker) {
			RN.router.navigate('', true);
		}
	},
	doLogOut: function(){
		localStorage.clear();
		RN.router.navigate('', true);
		return false;
	}
}