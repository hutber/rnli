var gulp = require('gulp');
var browserify = require('browserify');
var transform = require('vinyl-transform');
var uglify = require('gulp-uglify');
var plumber = require('gulp-plumber');
var handleErrors = require('../util/handleErrors');

gulp.task('browserify', function () {
	var browserified = transform(function(filename) {
		var b = browserify({
			entries: filename,
			debug: true
		});
		require("jadeify"), { compileDebug: true, pretty: false }
		return b.bundle();
	});

	return gulp.src(['./frontend/js/app.js'])
		.pipe(plumber({
			errorHandler: handleErrors
		}))
		.pipe(browserified)
		//.pipe(uglify())
		.pipe(gulp.dest('./app/www/js'));
});