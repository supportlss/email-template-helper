const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const baseDir = "./dist";

// build complete HTML email template
gulp.task('build', function() {
  return gulp.src('src/emails/**/*.html')
              .pipe(gulp.dest('dist'))
})

// browserSync task to launch preview server
gulp.task('browserSync', function (done) {
  browserSync.init({
      reloadDelay: 2000, // reload after 2s, compilation is finished (hopefully)
      server: { baseDir: baseDir }
  });
  done()
});

// task to reload browserSync
gulp.task('reloadBrowserSync', function (done) {
  browserSync.reload();
  done()
});


gulp.task('watch', function () {
  return gulp.watch(['src/**/*'])
});


// watch source files for changes
// run `build` task when anything inside `src` folder changes (except .css)
// and reload browserSync
gulp.task('watch', function () {
  gulp.watch('src/emails/*.html', gulp.series('build', 'reloadBrowserSync'));
});

gulp.task('default', gulp.series("build", gulp.parallel("browserSync", 'watch')));



