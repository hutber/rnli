var gulp = require('gulp');
var sass = require('gulp-sass');
var handleErrors = require('../util/handleErrors');
var sourcemaps = require('gulp-sourcemaps');
var minifyCSS = require('gulp-minify-css');

gulp.task('sass', function () {
	return gulp.src('./frontend/sass/style.scss')
		.pipe(sourcemaps.init())
		.pipe(sass({
			'require':'susy'
		}))
		//.pipe(minifyCSS())
		.pipe(sourcemaps.write('./app/www/css'))
		.on('error', handleErrors)
		.pipe(gulp.dest('./app/www/css'))
});