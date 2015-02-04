var gulp = require('gulp');
var jade = require('gulp-jade');
var handleErrors = require('../util/handleErrors');
var ngHtml2Js = require("gulp-ng-html2js");
var minifyHtml = require("gulp-minify-html");
var concat = require("gulp-concat");
var uglify = require("gulp-uglify");

gulp.task('html2js', function () {
	return gulp.src("./src/site/html/**/*.html")
		.on('error', handleErrors)
		.pipe(minifyHtml({
			empty: true,
			spare: true,
			quotes: true
		}))
		.pipe(ngHtml2Js({
			moduleName: "Views"
		}))
		.pipe(concat("views.min.js"))
		.pipe(uglify())
		.pipe(gulp.dest("./src/site/js"))
});
