'use strict';
module.exports =  function() {
	/**
	 * Created by Hutber on 10/12/2014.
	 */
	var globals = {};

	//Url Config
	globals.url = {};
	globals.url.protocol = 'http';
	globals.url.envioment = 'liveApp';
	globals.url.cdn = 'www.topazmarinesafetyapp.com/';
	globals.url.ajax = globals.url.http+'app';

	//check type of envoiment we are in
	globals.url.checkEnvio = function () {
		switch (window.location.hostname) {
			case "localhost" :
				globals.url.envioment = 'localApp',
					globals.url.cdn = 'rnli.local/'
				break;
			case "www.topazmarinesafetyapp.com" :
				globals.url.website = 'website';
				break;
			case "192.168.0.25":
				globals.url.envioment = 'mobilePhone'
				break;
		}
		globals.url.http = globals.url.protocol+'://'+globals.url.cdn;
		globals.url.ajax = globals.url.http+ 'app/';
	};

	// #Check if we are in the app... If we are do nothing
	if(window.location.protocol === "file:"){
		$.ajax({
			url:'icon-76-2x.png',
			type:'HEAD',
			error: function()
			{
				globals.url.checkEnvio();
			},
			success: function()
			{
//					c('//file exists');
			}
		});
	}else{
		globals.url.checkEnvio();
	}

	//Hash's
	globals.hash = 'index';
	globals.previoushash = 'index';

	//Title Bar
	globals.title = "";
	return globals;
}();
