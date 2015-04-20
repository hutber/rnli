module.exports = function () {
	'use strict';

	var camera = {

	};

	camera.shoot = function (callBack) {
		navigator.camera.getPicture(function(data){
			camera.onSuccess(data, callBack);
		}, camera.onFail, {
			quality: 50,
			destinationType : Camera.DestinationType.DATA_URL,
			sourceType : Camera.PictureSourceType.CAMERA
		});
	}

	camera.onSuccess = function (imageURI, successFun) {
		c(arguments);
		c('onSucess ^^^');
		var url = RN.glb.url.ajax + 'users/uploadProfileImage';
		var params = {
			image: imageURI,
			uid: RN.user.get('uid')
		};

		// send the data
		$.ajax({
			url: url,
			type: 'POST',
			data: params,
			error: function (data) {
			},
			success: function(data){
				successFun(data);
			}
		});
	};

	camera.onFail = function (message) {
		alert('Failed because: ' + message);
	};

	return camera;
};