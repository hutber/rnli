'user strict';

//extend the view with the default home view
module.exports = RN.glb.gvCreator.extend({
	el: '.content',
	templates: {
		home: require('../../../../views/trips/previousTrip.jade'),
	},
	events: {
		'click .updatetrip': 'updatetrip',
		'click .previouscatchclick': 'catchfishbox',
	},

	updatetrip : function(){
		var finalData = RN.previousTrip.prePareDataForDB();
		RN.previousTrip.finaliseTrip(finalData, function(){
			RN.router.navigate('trips', true);
		});
	},
	catchfishbox : function(ev){
		var ev = $(ev.currentTarget);
		localStorage.currentCatch = function () {
			var desired;
			Object.keys(RN.user.get('catch')).forEach(function (val) {
				if(parseInt(RN.user.get('catch')[val].id) === ev.data('id')){
					desired = RN.user.get('catch')[val];
				}
			});
			return JSON.stringify(desired);
		}();
		RN.router.navigate('trippreviouscatch', true);
	},

	render: function () {

		if(Object.keys(RN.previousTrip.attributes).length<=1) {
			RN.router.navigate('trips', true);
		}else{
			var data = RN.previousTrip.attributes;
			data['previoustrip'] = true;

			this.$el.html(this.templates.home({
				data: data
			}));

			$('.middle h1').text(data.area + ', ' + data.continent);

			var styledMap = new google.maps.StyledMapType(RN.glb.gmapStyles, {name: "Styled Map"}),
				myLatlng = new google.maps.LatLng(data.latitude, data.longitude),
				mapOptions = {
					zoom: 9,
					center: myLatlng,
					disableDefaultUI: true
				};
			var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

			//Associate the styled map with the MapTypeId and set it to display.
			map.mapTypes.set('map_style', styledMap);
			map.setMapTypeId('map_style');
			var marker = new google.maps.Marker({
				position: myLatlng,
				map: map
			});
		}
	}
});