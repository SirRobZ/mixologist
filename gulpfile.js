var gulp = require('gulp');
var sass = require('gulp-sass');

gulp.task('sass', function() {
	return gulp.src('styles/main.scss')
		.pipe(sass())
		.pipe(gulp.dest('styles'));
});

// Watch
gulp.task('watch', function() {

  // Watch .scss files
  gulp.watch('styles/sass/*.scss', function(event) {
    console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
    gulp.run('sass');
  });
});

gulp.task('default', function() {
	gulp.run(['sass', 'watch'])
})