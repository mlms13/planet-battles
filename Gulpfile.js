var gulp = require('gulp'),
    gutil = require('gulp-util'),

    // gulp plugins and helpers
    browserify = require('browserify'),
    jshint = require('gulp-jshint'),
    nodeStatic = require('node-static'),
    open = require('open'),
    source = require('vinyl-source-stream'),
    stylish = require('jshint-stylish'),

    // configuration
    port = gutil.env.port || 3000,
    paths = {
      lib: {
        all: ['./node_modules/phaser/build/phaser.min.js',
             './node_modules/phaser/build/phaser.map']
      },
      js: {
        main: './src/index.js',
        all: ['./src/**/*.js', './Gulpfile.js']
      },
      html: {
        all: ['./src/index.html']
      },
      dest: './dist'
    };

gulp.task('copy', function () {
  return gulp.src(paths.lib.all.concat(paths.html.all))
    .pipe(gulp.dest(paths.dest));
});

gulp.task('lint', function () {
  return gulp.src(paths.js.all)
    .pipe(jshint())
    .pipe(jshint.reporter(stylish));
});

gulp.task('js', ['lint'], function () {
  return browserify(paths.js.main, {})
    .bundle()
    .pipe(source('bundle.js'))
    .pipe(gulp.dest(paths.dest));
});

gulp.task('server', function (cb) {
  var file = new nodeStatic.Server(paths.dest);

  require('http').createServer(function (req, res) {
    req.addListener('end', function () {
      file.serve(req, res);
    }).resume();
  }).listen(port, cb);
});

gulp.task('default', ['copy', 'js', 'server'], function () {
  open('http://localhost:' + port);
});
