var gulp = require('gulp');
var sass = require('gulp-ruby-sass');
var handleErrors = require('../util/handleErrors');
var minifyCSS = require('gulp-minify-css');

gulp.task('sass', function () {
	return gulp.src('./src/site/sass/style.scss')
		.pipe(sass({
			'sourcemapPath':'./public/css',
			'require':'susy'
		}))
		//.pipe(minifyCSS())
		.on('error', handleErrors)
		.pipe(gulp.dest('./public/css'))
});