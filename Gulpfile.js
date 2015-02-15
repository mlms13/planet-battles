var gulp = require('gulp'),
    browserify = require('browserify'),
    nodeStatic = require('node-static'),
    source = require('vinyl-source-stream');

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
  }).listen(3000, cb);
});

gulp.task('default', ['copy', 'js', 'server']);
