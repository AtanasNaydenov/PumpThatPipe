var gulp = require('gulp');
var gutil = require('gulp-util');
var inject = require('gulp-inject');

// doesn't work though
gulp.task('default', function () {
  var target = gulp.src('./index.html');
  var sources = gulp.src(['./app/**/*.js'], {read: false});
  print(sources);
  return target.pipe(inject(sources))
    .pipe(gulp.dest('./'));
});