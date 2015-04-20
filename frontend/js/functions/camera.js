module.exports = function () {
	'use strict';

	var camera = {

	};

	camera.shoot = function () {
		navigator.camera.getPicture(camera.onSuccess, camera.onFail, {
			quality: 50,
			destinationType: Camera.DestinationType.FILE_URI
		});
	}

	camera.onSuccess = function (imageURI) {
		var url = RN.glb.url.ajax + 'users/uploadProfileImage';
		var params = {image: imageURI};

		// send the data
		$.post(url, params, function(data) {
			c(data);
		});
	};

	camera.onFail = function (message) {
		alert('Failed because: ' + message);
	};

	return camera;
};