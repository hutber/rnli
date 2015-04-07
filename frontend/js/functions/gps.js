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
		addToLocalStorage: function (data) {
			var item = {},
				previousStorage = JSON.parse(localStorage.gps);
			previousStorage[new Date()] = data;
			localStorage.setItem('gps', JSON.stringify(previousStorage));
			c(JSON.parse(localStorage.gps));
		},
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
				c('something');
				gps.bgGeo.finish();
			};

			/**
			 * This callback will be executed every time a geolocation is recorded in the background.
			 */
			var callbackFn = function(location) {
				console.log('[js] BackgroundGeoLocation callback:  ' + location.latitude + ',' + location.longitude);
				// Update our current-position marker.
				gps.setCurrentLocation(location);
				c('something');

				// After you Ajax callback is complete, you MUST signal to the native code, which is running a background-thread, that you're done and it can gracefully kill that thread.
				yourAjaxCallback.call(this);
			};

			var failureFn = function(error) {
				console.log('BackgroundGeoLocation error');
				c('something');
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
			//gps.stopPositionWatch();
			gps.bgGeo.stop();
		},
		/**
		 * Once in foreground, re-engage foreground geolocation watch with standard Cordova GeoLocation api
		 */
		onResume: function() {
			console.log('- onResume');
			gps.bgGeo.start();
			//gps.watchPosition();
		},
		// Update DOM on a Received Event
		setCurrentLocation: function(location) {
			gps.addToLocalStorage(location);

			if (gps.previousLocation) {
				//c('We have not moved');
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