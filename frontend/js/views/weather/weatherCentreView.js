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
		'keyup .weathercentre .postcodeform': 'postcode'
	},

	getForcast : function(ev){
		var ev = $(ev.currentTarget),
			self = this;

		RN.weather.getThreeHour(RN.weather.get('location').latitude, RN.weather.get('location').longitude, function(data){
			var currentValue = $('select').val(),
				todaysWeather;

			$.each(data.weather, function(val, item){
				if(item.value===currentValue){
					todaysWeather = item;
				};
			});
			$('.weatherinfo').html(self.templates.weatherinfo({
					currentWeather: todaysWeather.Rep[0],
					weatherKey: data.key
				})
			);
			RN.fnc.popups.spinner.hide();
			$('.slideAreaAeather').slideUp();
		});
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
	getLocation : function(data, callBack){
		var self = this;
		RN.fnc.location.getClosestLocation(data.latitude, data.longitude, function(data){
			RN.weather.saveLocal('location', data);
			document.getElementById('createlocation').value = 'something';
			callBack(data);
		});
	},
	render: function () {
		//load data in ejs
		this.$el.html(this.templates.home());

		$('select').css('padding-left',$('body').outerWidth()/3);
		this.postcode();
	}
});