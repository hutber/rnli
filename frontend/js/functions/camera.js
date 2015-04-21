module.exports = function () {
	'use strict';

	var camera = {

	};

	camera.shoot = function (callBack, options) {
		navigator.camera.getPicture(function(data){
			camera.onSuccess(data, callBack, options);
		}, camera.onFail, {
			quality: 50,
			destinationType : Camera.DestinationType.DATA_URL,
			sourceType : Camera.PictureSourceType.CAMERA
		});
	}

	camera.onSuccess = function (imageURI, successFun, options) {
		//set up options
		options = options || {};
		options.params.image = imageURI;

		// send the data
		$.ajax({
			url: options.url,
			type: 'POST',
			data: options.params,
			error: function (data) {
			},
			success: function(data){
				successFun(data);
			}
		});
	};

	camera.capturePhoto = function () {
		// Take picture using device camera and retrieve image as base64-encoded string
		navigator.camera.getPicture(camera.onPhotoDataSuccess, camera.onFail, { quality: 50 });
	};

	//Callback function when the picture has been successfully taken
	camera.onPhotoDataSuccess = function  (imageData) {
		// Get image handle
		var smallImage = document.getElementById('smallImage');

		// Unhide image elements
		smallImage.style.display = 'block';
		smallImage.src = imageData;
	};

//Callback function when the picture has not been successfully taken
	camera.onFail = function (message) {
		alert('Failed to load picture because: ' + message);
	};

	camera.movePic = function (file){
		window.resolveLocalFileSystemURI(file, camera.resolveOnSuccess, camera.resOnError);
	};

	//Callback function when the file system uri has been resolved
	camera.resolveOnSuccess = function (entry){
		var d = new Date();
		var n = d.getTime();
		//new file name
		var newFileName = n + ".jpg";
		var myFolderApp = "EasyPacking";

		window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(fileSys) {
				//The folder is created if doesn't exist
				fileSys.root.getDirectory( myFolderApp,
					{create:true, exclusive: false},
					function(directory) {
						entry.moveTo(directory, newFileName,  camera.successMove, camera.resOnError);
					},
					camera.resOnError);
			},
			camera.resOnError);
	};

//Callback function when the file has been moved successfully - inserting the complete path
	camera.successMove = function (entry) {
		//I do my insert with "entry.fullPath" as for the path
		c('success');
	};

	camera.resOnError = function (error) {
		alert(error.code);
	};

	return camera;
};