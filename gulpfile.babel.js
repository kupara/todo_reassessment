import gulp from 'gulp';
import connect from 'gulp-connect';
import lint from 'gulp-eslint';
import babelify from 'babelify';
import sass from 'gulp-sass';
import source from 'vinyl-source-stream';
import nodemon from 'gulp-nodemon';
import browserify from 'browserify';
import mocha from 'gulp-mocha';

const config = {
  port: 3001,
  baseUrl: 'http://localhost',
  files: {
    html: './app/*.html',
    dist: './dist',
    sass: './app/styles/*.sass',
    js: './app/scripts/**/*.js',
    tests: './app/**/*test.js',
    mainJs: './app/scripts/main.js'
  }
};

gulp.task('server', () => {
  nodemon({
    script: 'server.js'
  , ext: 'js html'
  , ignore: 'app/**/*.js'
  , env: { 'NODE_ENV': 'development' }
  });
});

gulp.task('js', () => {
  browserify(config.files.mainJs)
    .transform(babelify)
    .bundle()
    .on('error', console.error.bind(console))
    .pipe(source('bundle.js'))
    .pipe(gulp.dest(`${config.files.dist}/scripts`))
    .pipe(connect.reload());
});

gulp.task('html', () => {
  gulp.src(config.files.html)
    .pipe(gulp.dest(config.files.dist))
    .pipe(connect.reload());
});

gulp.task('sass', () => {
  gulp.src(config.files.sass)
    .pipe(sass())
    .pipe(gulp.dest(`${config.files.dist}/styles`))
    .pipe(connect.reload());
});

gulp.task('lint', () => {
  gulp.src(config.files.js)
    .pipe(lint())
    .pipe(lint.format())
    // .pipe(lint.failAfterError());
});

gulp.task('test', () => {
  gulp.src(config.files.tests)
    .pipe(mocha({ reporter: 'dot' }))
});

gulp.task('watch', () => {
  gulp.watch(config.files.js, ['js', 'lint']);
  gulp.watch(config.files.html, ['html']);
  gulp.watch(config.files.sass, ['sass']);
});

gulp.task('default', ['js', 'html', 'lint', 'sass', 'server', 'watch']);
