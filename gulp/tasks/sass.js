//var gulp = require('gulp');
//var handleErrors = require('../util/handleErrors');
//var sourcemaps = require('gulp-sourcemaps');
//var minifyCSS = require('gulp-minify-css');
//
////libsass
//var sass = require('gulp-sass');
//gulp.task('sass', function () {
//	return gulp.src('./frontend/sass/style.scss')
//		.pipe(sourcemaps.init())
//		.pipe(sass({
//			'require':'susy',
//			loadPath: [
//				'C:/Ruby193/lib/ruby/gems/1.9.1/gems/susy-2.2.2/sass'
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