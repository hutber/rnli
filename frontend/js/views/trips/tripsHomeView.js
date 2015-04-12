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
		var ev = $(ev.currentTarget);
	},
	render: function () {

		var currentWeather = null;

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