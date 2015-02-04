/* Notes:
 - gulp/tasks/browserify.js handles js recompiling with watchify
 - gulp/tasks/browserSync.js watches and reloads compiled files
 */

var gulp = require('gulp');

gulp.task('watch', ['setWatch', 'browserSync'], function () {
	gulp.watch('./frontend/sass/**/*.scss', ['sass']);
	gulp.watch('./frontend/img/**', ['images']);
	//gulp.watch('./frontend/views/**/*.jade', ['jade']);
});
