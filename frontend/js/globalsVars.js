'use strict';
module.exports =  function() {
	/**
	 * Created by Hutber on 10/12/2014.
	 */
	var globals = {};

	//General Config
	globals.version = '0.0.2';
	globals.device = 'android';
	globals.gkey = 'AIzaSyB8ZaW3zP8WtWCMcBar4qbD9N4xNM2jNNA';
	globals.DPKey = '9ef3f3a2-f189-4cb4-a0c4-31b52691f81f';

	//Url Config
	globals.url = {};
	globals.url.protocol = 'http';
	globals.url.envioment = 'liveApp';
	globals.url.cdn = 'trackmycatch.rnli.org/';

	//check type of envoiment we are in
	globals.url.checkEnvio = function () {
		switch (window.location.hostname) {
			case "localhost" :
					globals.url.envioment = 'localApp',
					globals.url.cdn = 'rnli.local/';
				break;
			case "apprnli.hutber.com" :
					globals.url.envioment = 'testSite',
					globals.url.website = 'website';
				break;
			case "192.168.0.25":
					globals.url.envioment = 'mobilePhone';
				break;
		}
		globals.url.http = globals.url.protocol+'://'+globals.url.cdn;
		globals.url.ajax = globals.url.http+ 'app/';
		globals.url.api = globals.url.http+'api/';
	};

	// #Check if we are in the app... If we are do nothing
//	if(window.location.protocol === "file:"){
//		$.ajax({
//			url:'icon-76-2x.png',
//			type:'HEAD',
//			error: function()
//			{
//				globals.url.checkEnvio();
//			},
//			success: function()
//			{
////					c('//file exists');
//			}
//		});
//	}else{
		globals.url.checkEnvio();
	//}

	//Hash's
	globals.hash = 'index';
	globals.previoushash = 'index';
	globals.safety = {
		type: null,
		page: null
	};
	globals.backButton = false;
	globals.backButtonLocation = 'home';

	//UI's
	globals.pageHeight = 0;

	//Map Settings
	globals.gmapStyles = [
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
	];

	return globals;
}();
