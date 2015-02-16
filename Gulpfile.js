var gulp = require('gulp'),
    gutil = require('gulp-util'),

    // gulp plugins and helpers
    browserify = require('browserify'),
    jshint = require('gulp-jshint'),
    lr = require('gulp-livereload'),
    nodeStatic = require('node-static'),
    open = require('open'),
    source = require('vinyl-source-stream'),
    stylish = require('jshint-stylish'),
    stylus = require('gulp-stylus'),
    watchify = require('watchify'),

    // configuration
    port = gutil.env.port || 3000,
    paths = {
      lib: {
        all: ['./node_modules/phaser/build/phaser.min.js',
             './node_modules/phaser/build/phaser.map'],
        dest: './dist/js'
      },
      html: {
        all: ['./src/index.html'],
        dest: './dist'
      },
      assets: {
        all: ['./src/assets/**/*'],
        dest: './dist/assets/'
      },
      js: {
        main: './src/js/index.js',
        all: ['./src/js/**/*.js', './Gulpfile.js'],
        dest: './dist/js'
      },
      stylus: {
        main: './src/styl/index.styl',
        all: './src/styl/**/*.styl',
        dest: './dist/css'
      }
    };

gulp.task('copy:html', function () {
  return gulp.src(paths.html.all)
    .pipe(gulp.dest(paths.html.dest))
    .pipe(lr());
});

gulp.task('copy:lib', function () {
  return gulp.src(paths.lib.all)
    .pipe(gulp.dest(paths.lib.dest))
    .pipe(lr());
});

gulp.task('copy:assets', function () {
  return gulp.src(paths.assets.all)
    .pipe(gulp.dest(paths.assets.dest))
    .pipe(lr());
});

gulp.task('stylus', function () {
  return gulp.src(paths.stylus.main)
    .pipe(stylus())
    .pipe(gulp.dest(paths.stylus.dest))
    .pipe(lr());
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
    .pipe(gulp.dest(paths.js.dest));
});

gulp.task('watch', function () {
  lr.listen();

  var bundler = watchify(browserify(paths.js.main, {
    cache: {},
    packageCache: {},
    fullPaths: true,
    debug: true
  }));

  function rebundle() {
    var t = Date.now();
    gutil.log('Starting Watchify rebundle');
    return bundler.bundle()
        .pipe(source('bundle.js'))
        .pipe(gulp.dest(paths.js.dest))
        .pipe(lr())
        .on('end', function () {
            gutil.log('Finished bundling after:', gutil.colors.magenta(Date.now() - t + ' ms'));
        });
  }

  bundler.on('update', rebundle);
  gulp.watch(paths.js.all, ['lint']);
  gulp.watch(paths.html.all, ['copy']);
  gulp.watch(paths.assets.all, ['copy:assets']);
  gulp.watch(paths.stylus.all, ['stylus']);

  return rebundle();
});

gulp.task('server', function (cb) {
  var file = new nodeStatic.Server(paths.dest);

  require('http').createServer(function (req, res) {
    req.addListener('end', function () {
      file.serve(req, res);
    }).resume();
  }).listen(port, cb);
});

gulp.task('default', ['copy:html', 'copy:lib', 'copy:assets', 'stylus', 'server', 'watch'], function () {
  open('http://localhost:' + port);
});
