'user strict';

//extend the view with the default home view
module.exports = RN.glb.gvCreator.extend({
	el: '.content',
	templates: {
		home: require('../../../views/trips/tripsHome.jade'),
	},
	events: {
		'click .tripHomeBox': 'moveToTrip',
	},
	moveToTrip : function(ev){
		var ev = $(ev.currentTarget),
			desired,
			notes = {},
			catches = {};

		//get trips
		Object.keys(RN.trips.get('trips')).forEach(function (val) {
			if(parseInt(RN.trips.get('trips')[val].tid) === ev.data('id')){
				desired = RN.trips.get('trips')[val];
			}
		});

		//get Notes
		Object.keys(RN.user.get('notes')).forEach(function (val, item) {
			if(parseInt(RN.user.get('notes')[val].tid) === ev.data('id')){
				notes[val] = RN.user.get('notes')[val];
			}
		});

		//get Catches
		Object.keys(RN.user.get('catch')).forEach(function (val, item) {
			if(parseInt(RN.user.get('catch')[val].tid) === ev.data('id')){
				catches[val] = RN.user.get('catch')[val];
			}
		});
		desired.notes = notes;
		desired.catches = catches;

		RN.previousTrip.initialize(desired);

		RN.router.navigate('tripsprevious', true);
	},
	render: function () {

		var currentWeather = null,
			airsea = null;

		if(typeof RN.weather.get('3hourWeather') !== typeof undefined){
			currentWeather = RN.weather.get('3hourWeather'),
			airsea = {
				temperature: RN.weather.get('temperature'),
				seatemperature: RN.weather.get('seatemperature')
			}
		}

		//load data in ejs
		this.$el.html(this.templates.home({
			currentWeather: currentWeather,
			airsea: airsea
		}));
	}
});