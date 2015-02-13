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
		require("jadeify"), { compileDebug: true, pretty: true }
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

/* browserify task
 ---------------
 Bundle javascripty things with browserify!

 If the watch task is running, this uses watchify instead
 of browserify for faster bundling using caching.
 */

//var browserify = require('browserify');
//var watchify = require('watchify');
//var bundleLogger = require('../util/bundleLogger');
//var gulp = require('gulp');
//var handleErrors = require('../util/handleErrors');
//var source = require('vinyl-source-stream');
//var transform = require('vinyl-transform');
//var uglify = require('gulp-uglify');
//
//	gulp.task('browserify', function () {
//		var bundler = browserify({
//			// Required watchify args
//			cache: {}, packageCache: {}, fullPaths: true,
//			// Specify the entry point of your app
//			entries: ['./frontend/js/app.js'],
//			// Add file extentions to make optional in your requires
//			extensions: ['.js'],
//			// Enable source maps!
//			debug: true
//		});
//
//		//bundler.transform({
//		//	global: true
//		//}, 'uglifyify');
//
//		var bundle = function () {
//			// Log when bundling starts
//			bundleLogger.start();
//
//			return bundler
//				.bundle()
//				// Report compile errors
//				.on('error', handleErrors)
//				//make the file a little bit smaller
//				//.pipe(uglify())
//				// Use vinyl-source-stream to make the
//				// stream gulp compatible. Specifiy the
//				// desired output filename here.
//				.pipe(source('app.js'))
//				// Specify the output destination
//				.pipe(gulp.dest('./app/www/js'))
//				// Log when bundling completes!
//				.on('end', bundleLogger.end);
//		};
//
//		if (global.isWatching) {
//			bundler = watchify(bundler);
//			// Rebundle with watchify on changes.
//			bundler.on('update', bundle);
//		}
//
//		return bundle();
//	});
