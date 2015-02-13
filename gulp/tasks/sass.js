//var gulp = require('gulp');
//var sass = require('gulp-sass');
//var handleErrors = require('../util/handleErrors');
//var sourcemaps = require('gulp-sourcemaps');
//var minifyCSS = require('gulp-minify-css');
//var debug = require('gulp-debug');
//
////libsass
//gulp.task('sass', function () {
//	return gulp.src('./frontend/sass/style.scss')
//		.pipe(sourcemaps.init())
//		//.pipe(debug({title: 'unicorn:'}))
//		.pipe(sass({
//			includePaths: [
//				'./node_modules/susy/sass'
//			]
//		}))
//		//.pipe(minifyCSS())
//		.pipe(sourcemaps.write('./app/www/css'))
//		.on('error', handleErrors)
//		.pipe(gulp.dest('./app/www/css'))
//});

var gulp = require('gulp');
var sass = require('gulp-ruby-sass');
var handleErrors = require('../util/handleErrors');
var minifyCSS = require('gulp-minify-css');

gulp.task('sass', function () {
	return gulp.src('./frontend/sass/style.scss')
		.pipe(sass({
			'sourcemapPath':'./app/www/css',
			'require':'susy'
		}))
		//.pipe(minifyCSS())
		.on('error', handleErrors)
		.pipe(gulp.dest('./app/www/css'))
});