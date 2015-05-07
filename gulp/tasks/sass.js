var gulp = require('gulp');
var sass = require('gulp-sass');
var handleErrors = require('../util/handleErrors');
var sourcemaps = require('gulp-sourcemaps');
var minifyCSS = require('gulp-minify-css');
var debug = require('gulp-debug');
var plumber = require('gulp-plumber');

//libsass
gulp.task('sass', function () {
	return gulp.src('./frontend/sass/style.scss')
		.pipe(plumber({
			errorHandler: handleErrors
		}))
		.pipe(sourcemaps.init())
		.pipe(sass({
			includePaths: [
				//'./node_modules/susy/sass'
				//'C:/var/www/trackmycatch.rnli.org/node_modules/bootstrap-sass/assets/stylesheets'
			]
		}))
		//.pipe(minifyCSS())
		.pipe(sourcemaps.write('./app/www/css'))
		//.on('error', handleErrors)
		.pipe(gulp.dest('./app/www/css'))
});

//var gulp = require('gulp');
//var sass = require('gulp-ruby-sass');
//var handleErrors = require('../util/handleErrors');
//var minifyCSS = require('gulp-minify-css');
//
//gulp.task('sass', function () {
//	return gulp.src('./frontend/sass/style.scss')
//		.pipe(sass({
//			'sourcemapPath':'./app/www/css',
//			'require':'susy'
//		}))
//		//.pipe(minifyCSS())
//		.on('error', handleErrors)
//		.pipe(gulp.dest('./app/www/css'))
//});