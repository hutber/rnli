var browserSync = require('browser-sync');
var gulp = require('gulp');

gulp.task('browserSync', ['build'], function () {
	browserSync({
		proxy: "rnli.local/app/www/",
		files: [
			// Only reload when the style.css has been built.
			"./app/www/css/style.css",
			//reload with any js changes in the app/www folder
			"./app/www/js/**",
			//reload for any images changed in app/www
			"./app/www/img/**",
			//refresh once we have finished building views.min.js
			"./app/www/views/*.min.js",
			"./app/www/js/main.js",
			// Exclude sourcemap files
			"!./app/www/css/*.map",
		],
		notify : "This message will only last a second"
	});
});
