module.exports = function () {
	'use strict';

	var gps = {};

	gps = {
		/**
		 * @property {Boolean} aggressiveEnabled
		 */
		aggressiveEnabled: false,
		/**
		 * @property {Array} locations List of rendered map markers of prev locations
		 */
		locations: [],
		/**
		 * @private
		 */
		btnEnabled: undefined,
		btnPace: undefined,
		btnHome: undefined,
		btnReset: undefined,

		send: function(){
			$.ajax({
				url: 'http://rnli.hutber.com/api/location/takeGPS',
				type: 'POST',
				dataType: "json",
				data: {
					'lat': '1212',
					'long': '12312'
				},
				error: function (data) {
				},
				success: function (data) {
				}
			});
		},
		configureBackgroundGeoLocation: function() {
			var fgGeo = window.navigator.geolocation;
				gps.bgGeo = window.plugins.backgroundGeoLocation;

			/**
			 * This would be your own callback for Ajax-requests after POSTing background geolocation to your server.
			 */
			var yourAjaxCallback = function(response) {
				console.info(response);
				gps.bgGeo.finish();
			};

			/**
			 * This callback will be executed every time a geolocation is recorded in the background.
			 */
			var callbackFn = function(location) {
				console.log('[js] BackgroundGeoLocation callback:  ' + location.latitude + ',' + location.longitude);
				// Update our current-position marker.
				gps.setCurrentLocation(location);

				// After you Ajax callback is complete, you MUST signal to the native code, which is running a background-thread, that you're done and it can gracefully kill that thread.
				yourAjaxCallback.call(this);
			};

			var failureFn = function(error) {
				console.log('BackgroundGeoLocation error');
			};

			// Only ios emits this stationary event
			gps.bgGeo.onStationary(function(location) {
				c('You have stopped moving');
			});

			// BackgroundGeoLocation is highly configurable.
			gps.bgGeo.configure(callbackFn, failureFn, {
				url: 'http://rnli.hutber.com/api/location/takeGPS', // <-- Android ONLY:  your server url to send locations to
				params: {
					auth_token: 'hutber',    //  <-- Android ONLY:  HTTP POST params sent to your server when persisting locations.
					foo: 'bar'                              //  <-- Android ONLY:  HTTP POST params sent to your server when persisting locations.
				},
				desiredAccuracy: 0,
				stationaryRadius: 50,
				distanceFilter: 50,
				notificationTitle: 'RNLI', // <-- android only, customize the title of the notification
				notificationText: 'GPS tracking enabled', // <-- android only, customize the text of the notification
				activityType: 'AutomotiveNavigation',
				debug: false, // <-- enable this hear sounds for background-geolocation life-cycle.
				stopOnTerminate: false // <-- enable this to clear background location settings when the gps terminates
			});
		},
		onClickHome: function() {
			var fgGeo = window.navigator.geolocation;

			// Your gps must execute AT LEAST ONE call for the current position via standard Cordova geolocation,
			//  in order to prompt the user for Location permission.
			fgGeo.getCurrentPosition(function(location) {
				console.info('getCurrentPosition');
			});
		},
		onClickChangePace: function(value) {
			var  btnPace = gps.btnPace;

			btnPace.removeClass('btn-success');
			btnPace.removeClass('btn-danger');

			var isAggressive = ENV.toggle('aggressive');
			if (isAggressive == 'true') {
				btnPace.addClass('btn-danger');
				gps.bgGeo.changePace(true);
			} else {
				btnPace.addClass('btn-success');
				gps.bgGeo.changePace(false);
			}
		},
		onClickReset: function() {
			// Clear prev location markers.
			var locations = gps.locations;
			console.info(locations)
			gps.locations = [];

			// Clear Polyline.
			gps.path = undefined;
		},
		onClickToggleEnabled: function(value) {
			var btnEnabled  = gps.btnEnabled,
				isEnabled   = ENV.toggle('enabled');

			btnEnabled.removeClass('btn-danger');
			btnEnabled.removeClass('btn-success');

			if (isEnabled == 'true') {
				btnEnabled.addClass('btn-danger');
				btnEnabled[0].innerHTML = 'Stop';
				gps.bgGeo.start();
			} else {
				btnEnabled.addClass('btn-success');
				btnEnabled[0].innerHTML = 'Start';
				gps.bgGeo.stop();
			}
		},
		watchPosition: function() {
			var fgGeo = window.navigator.geolocation;
			if (gps.watchId) {
				gps.stopPositionWatch();
			}
			// Watch foreground location
			gps.watchId = fgGeo.watchPosition(function(location) {
				gps.setCurrentLocation(location.coords);
			}, function() {}, {
				enableHighAccuracy: true,
				maximumAge: 5000,
				frequency: 10000,
				timeout: 10000
			});
		},
		stopPositionWatch: function() {
			var fgGeo = window.navigator.geolocation;
			if (gps.watchId) {
				fgGeo.clearWatch(gps.watchId);
				gps.watchId = undefined;
			}
		},
		/**
		 * Cordova foreground geolocation watch has no stop/start detection or scaled distance-filtering to conserve HTTP requests based upon speed.
		 * You can't leave Cordova's GeoLocation running in background or it'll kill your battery.  This is the purpose of BackgroundGeoLocation:  to intelligently
		 * determine start/stop of device.
		 */
		onPause: function() {
			console.log('- onPause');
			gps.stopPositionWatch();
			gps.bgGeo.stop();
		},
		/**
		 * Once in foreground, re-engage foreground geolocation watch with standard Cordova GeoLocation api
		 */
		onResume: function() {
			console.log('- onResume');
			gps.bgGeo.start();
			gps.watchPosition();
		},
		// Update DOM on a Received Event
		setCurrentLocation: function(location) {
			gps.send();
			console.info('getCurrentLocation');
			console.info(location);
			if (!gps.location) {

			}
			if (!gps.path) {

			}

			if (gps.previousLocation) {
			}

			// Add breadcrumb to current Polyline path.
			gps.previousLocation = location;
		}
	};
	if(RN.glb.url.envioment==="liveApp") {
		gps.configureBackgroundGeoLocation();
	};
	return gps;
};