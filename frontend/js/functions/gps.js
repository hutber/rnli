module.exports = function () {
	'use strict';

	var gps = {
		bgGeo: null
	};

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
				previousStorage = {};
			if(typeof localStorage.gps !== typeof undefined) {
				previousStorage = JSON.parse(localStorage.gps);
			}
			previousStorage[new Date()] = data;
			localStorage.setItem('gps', JSON.stringify(previousStorage));
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

			var yourAjaxCallback = function(response) {
				console.info(response);
				c('ajax');
				gps.bgGeo.finish();
			};

			var callbackFn = function(location) {
				console.log('[js] BackgroundGeoLocation callback:  ' + location.latitude + ',' + location.longitude);
				// Update our current-position marker.
				gps.setCurrentLocation(location);
				c('callbackFn');

				yourAjaxCallback.call(this);
			};

			var failureFn = function(error) {
				console.log('BackgroundGeoLocation error');
			};

			gps.bgGeo.onStationary(function(location) {
				gps.addToLocalStorage(location);
				console.log('- Device is stopped: ', location.latitude, location.longitude);
			});

			// BackgroundGeoLocation is highly configurable.
			gps.bgGeo.configure(callbackFn, failureFn, {
				desiredAccuracy: 0,// <-- 0:  highest power, highest accuracy; 1000:  lowest power, lowest accuracy.
				stationaryRadius: 0,notificationTitle: 'RNLI', // <-- android only, customize the title of the notification
				notificationText: 'GPS Tracking On', // <-- android only, customize the text of the notification
				distanceFilter: 0,// <-- minimum distance between location events
				activityType: 'AutomotiveNavigation',// <-- [ios]
				locationUpdateInterval: 0,// <-- [android] minimum time between location updates, used in conjunction with #distanceFilter
				activityRecognitionInterval: 1000,// <-- [android] sampling-rate activity-recognition system for movement/stationary detection
				debug: true,// <-- enable this hear sounds, see notifications during life-cycle events.
				stopOnTerminate: false // <-- enable this to clear background location settings when the app terminates
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
		onPause: function() {
			console.log('- Stop');
			//gps.stopPositionWatch();
			gps.bgGeo.stop();
		},
		onResume: function() {
			console.log('- Start');
			gps.bgGeo.start(function(){
				c('starting');
			}, function () {
				c('failed');
			});
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
		gps.bgGeo.changePace(true)
	};
	return gps;
};