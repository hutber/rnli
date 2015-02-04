var gulp = require('gulp');
var jade = require('gulp-jade');
var handleErrors = require('../util/handleErrors');
var source = require('vinyl-source-stream');
var rename = require('gulp-rename');

	gulp.task('jade', function () {
		return gulp.src('./src/site/views/**/*.jade')
			.on('error', handleErrors)
			.pipe(jade())
			.pipe(gulp.dest('src/site/html'));
	});
