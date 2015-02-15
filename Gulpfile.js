var gulp = require('gulp'),
    gutil = require('gulp-util'),

    // gulp plugins and helpers
    browserify = require('browserify'),
    nodeStatic = require('node-static'),
    open = require('open'),
    source = require('vinyl-source-stream'),

    // configuration
    port = gutil.env.port || 3000;

gulp.task('copy', function () {
  return gulp.src(['./node_modules/phaser/build/phaser.min.js', './src/index.html'])
    .pipe(gulp.dest('./dist'));
});

gulp.task('js', function () {
  return browserify('./src/index.js', {})
    .bundle()
    .pipe(source('bundle.js'))
    .pipe(gulp.dest('./dist'));
});

gulp.task('server', function (cb) {
  var file = new nodeStatic.Server('./dist');

  require('http').createServer(function (req, res) {
    req.addListener('end', function () {
      file.serve(req, res);
    }).resume();
  }).listen(port, cb);
});

gulp.task('default', ['copy', 'js', 'server'], function () {
  open('http://localhost:' + port);
});
