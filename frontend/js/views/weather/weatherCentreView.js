 'user strict';

//extend the view with the default home view
module.exports = RN.glb.gvCreator.extend({
	el: '.content',
	templates: {
		home: require('../../../views/weather/weather.jade'),
		postCode: require('../../../views/trips/tipsPostCodeResults.jade'),
		weatherinfo: require('../../../views/weather/weatherinfo.jade')
	},
	events: {
		'click .weathercentre .yes': 'locationOn',
		'click .weathercentre .no': 'locationOff',
		'click .weathercentre .postboxbox': 'setPostCode',
		'click .getforcast': 'getForcast',
		'keyup .weathercentre .postcodeform': 'postcode',
		'change #weatherdate': 'showOptions',
	},

	showOptions: function () {
		$('.slideAreaAeather').slideDown();
	},

	getForcast : function(ev){
		var ev = $(ev.currentTarget),
			self = this;

		//Now we have users location look up via ajax the area ID from met office DataPoint
		RN.fnc.location.getClosestLocation(RN.weather.get('location').latitude, RN.weather.get('location').longitude, $('#weatherdate')[0].value, function(data){
			self.loadFromData(data);
		});
	},

	loadFromData : function(data){
		var currentValue = $('select').val(),
			todaysWeather;

		//backup weather to local storage
		RN.weather.setWeather(data);

		$('.weatherinfo').html(this.templates.weatherinfo({
				currentWeather: data
			})
		);
		RN.fnc.popups.spinner.hide();
		$('.slideAreaAeather').slideUp();
	},

	locationOn: function(ev){
		var ev = $(ev.currentTarget),
			self = this;
		$('.selected').removeClass('selected');
		ev.addClass('selected')
		var tripData = RN.fnc.location.lookUp(function(returnData){
				RN.weather.setLocation(returnData.coords);

				//display getforcast
				$('.getforcast').show();

				//Reset Postcode
				$('.postcodearea').empty();
				RN.fnc.popups.spinner.hide();
				document.getElementById('postcode').value = '';
			},function(){
				RN.fnc.popups.message.show('Please make sure your GPS is turned on and try again', 'bad')
			}
		);
	},
	locationOff: function(ev){
		if(typeof ev !== typeof undefined) {
			var ev = $(ev.currentTarget);
			$('.selected').removeClass('selected');
			ev.addClass('selected')
		};
		//Remove from local Storage
		localStorage.removeItem('weatherlocation')
		$('.getforcast').hide();
		//TODO - remove location from save settings
	},
	postcode : function(ev){
		var ev = $('#postcode');
		var postcode = ev.serializeObject().postcode,
			self = this;

		if(postcode.length > 4) {
			var postcodeResults = RN.fnc.location.getPostCode(postcode, function (data) {
				if (data.status === 200) {
					//save postcode in local storage and model
					RN.weather.saveLocal('postcode', data.result);
					$('.postcodearea').html(self.templates.postCode(data));
				}else{
					$('.postcodearea').html(self.templates.postCode());
				}
			});
		}else{
			$('.postcodearea').html(self.templates.postCode({length:postcode.length}));
		}
		return false;
	},
	setPostCode : function(ev){
		var ev = $(ev.currentTarget),
			currentPostCodeData = RN.weather.get('postcode'),
			self = this;

		$('.postboxbox').removeClass('selected');
		ev.addClass('selected');

		//set location
		RN.weather.setLocation(currentPostCodeData[ev.index()]);

		self.locationOff();
		$('.getforcast').show();
	},
	getWeatherLocation : function(data, callBack){
		var self = this;
		RN.fnc.location.getClosestLocation(data.latitude, data.longitude, function(data){
			RN.weather.saveLocal('location', data);
			document.getElementById('createlocation').value = 'something';
			callBack(data);
		});
	},
	render: function () {
		var self = this;

		RN.weather.checkAval('daily', function(){
			var dates = function () {
				var returnData = {}, i = 1;
				RN.weather.get('aval').forEach(function (val) {
					var selected = false;

					if( moment(val).format("DD MMMM YYYY") ===  moment(new Date()).format("DD MMMM YYYY")){
						selected = true;
					}

					returnData[i] = {
						value: moment(val).format("YYYY-MM-DD") + 'Z',
						text: moment(val).format("DD MMMM YYYY"),
						selected: selected
					};
					i++;
				});
				return returnData;
			}();

			//load data in ejs
			self.$el.html(self.templates.home({
				date: dates
			}));

			$('select').css('padding-left',$('body').outerWidth()/3.6);

			//for local dev
			if(typeof RN.weather.get('weatherDetails') !== "undefined" && RN.glb.url.envioment === 'localApp') {
				self.loadFromData(RN.weather.get('weatherDetails'));
			}
		});
	}
});