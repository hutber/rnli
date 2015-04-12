'user strict';

//extend the view with the default home view
module.exports = RN.glb.gvCreator.extend({
	el: '.content',
	templates: {
		home: require('../../../views/trips/tripsCurrent.jade'),
	},
	map: {},
	when: 'present',
	events: {
		'click .retry': 'render',
		'click .starttrip': 'start',
		'click .endtrip': 'end',
		'click .savetrip': 'savetrip',
		'click .enlargetrip': 'enlargeMap'
	},

	start : function(ev){
		var ev = $(ev.currentTarget);
		ev.hide();
		$('.endtrip').show();

		if($('input[name=gpstracking]:checked')[0].id==="gpstrackingyes") {
			//start gps
			RN.gps.onResume();
		}
	},
	end : function(ev){
		var ev = $(ev.currentTarget);
		ev.hide();
		$('.endtrip').hide();
		$('.savetrip').show();


		if($('input[name=gpstracking]:checked')[0].id==="gpstrackingyes") {
			//start gps
			RN.gps.onPause();
		}
	},
	savetrip : function(){
		var finalData = RN.currentTrip.prePareDataForDB();
		RN.currentTrip.finaliseTrip(finalData, function(){
			RN.router.navigate('tripclosed', true);
		});
	},
	enlargeMap : function(ev){
		$('#map-canvas').toggleClass('bigmap');
	},

	whenTrip : function(data){
		var now = moment(),
			self = this,
			difference = now.diff(RN.currentTrip.get('date')[1], 'days');

		if(moment(RN.currentTrip.get('date')[1]).isSame(moment(), 'day')) {
			localStorage.ctripwhen = "present";
		}
		else if(difference < 0) {
			localStorage.ctripwhen = "future";
		}else if (difference > 0) {
			localStorage.ctripwhen = "past";
		}
	},

	render: function () {
		if(RN.currentTrip.get('details')===null){
			RN.fnc.popups.message.show('No Trip Details Were Found', 'bad');
			RN.router.navigate('createtrip', true);
		}else{
			var self = this,
				cords = {
					longitude: RN.currentTrip.get('details').longitude,
					latitude: RN.currentTrip.get('details').latitude
				},
				currentLocationData = RN.currentTrip.get('details') || {};

			//for local dev
			if(typeof currentLocationData === "undefined" && RN.glb.url.envioment === 'localApp') {
				RN.fnc.location.getClosestLocation(cords.latitude, cords.long, RN.currentTrip.get('details').time, function (data) {
					currentLocationData = data;
				});
			}

			//Check when were are
			this.whenTrip();

			if(localStorage.ctripwhen === "past"){
				$('.middle h1').text('PAST TRIP')
			}else if (localStorage.ctripwhen === "future"){
				$('.middle h1').text('FUTURE TRIP')
			}

			if(currentLocationData === 'null'){
				//for the user home
				RN.router.navigate('createtrip ', true);
			}else {

				//Load the page
				if (currentLocationData.waveheight > 3) {
					currentLocationData['notsafe'] = 'danger';
				}
				//load in view with data
				self.$el.html(self.templates.home({data: currentLocationData}));

				//Rerender navigation if we need to
				if(RN.currentTrip.isFuture()){
					//$('.tripfooter a').addClass('disabled').removeAttr('href');
					$('.tripfooter a').addClass('disabled').removeAttr('href');
				}

				//Set up google maps
				var styles = [
						{
							"featureType": "administrative",
							"elementType": "labels.text.fill",
							"stylers": [
								{
									"color": "#444444"
								}
							]
						},
						{
							"featureType": "landscape",
							"elementType": "all",
							"stylers": [
								{
									"color": "#f2f2f2"
								}
							]
						},
						{
							"featureType": "poi",
							"elementType": "all",
							"stylers": [
								{
									"visibility": "off"
								}
							]
						},
						{
							"featureType": "road",
							"elementType": "all",
							"stylers": [
								{
									"saturation": -100
								},
								{
									"lightness": 45
								}
							]
						},
						{
							"featureType": "road.highway",
							"elementType": "all",
							"stylers": [
								{
									"visibility": "simplified"
								}
							]
						},
						{
							"featureType": "road.arterial",
							"elementType": "labels.icon",
							"stylers": [
								{
									"visibility": "off"
								}
							]
						},
						{
							"featureType": "transit",
							"elementType": "all",
							"stylers": [
								{
									"visibility": "off"
								}
							]
						},
						{
							"featureType": "water",
							"elementType": "all",
							"stylers": [
								{
									"color": "#a5ddf0"
								},
								{
									"visibility": "on"
								}
							]
						}
					],
					styledMap = new google.maps.StyledMapType(styles, {name: "Styled Map"}),
					myLatlng = new google.maps.LatLng(cords.latitude, cords.longitude),
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

		//check to see which day we are in
		if(!RN.currentTrip.isToday()){
			$('.starttrip').hide();
			$('.endtrip').hide();
			$('.savetrip').show();
		}

		if(typeof localStorage.gps !== typeof undefined) {
			//check GPS
			RN.fnc.events.checkGPS();

			$('.starttrip').hide();
			$('.endtrip').show();
		}
	}
});