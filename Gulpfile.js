var gulp  = require('gulp');
var icons = require('./index.js');

gulp.task('default', function () {
  return gulp.src('test/index.html')
    .pipe(icons())
    .pipe(gulp.dest('tmp'));
});
