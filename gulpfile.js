const gulp = require('gulp');
// const concat = require('gulp-concat-css');
const plumber = require('gulp-plumber');
const del = require('del');
const browserSync = require('browser-sync').create();
const concat = require('gulp-concat');
const order = require('gulp-order');

function serve() {
  browserSync.init({
    server: {
      baseDir: './dist'
      // baseDir: '.'
    }
  });
}

function html() {
  return gulp.src('src/**/*.html')
        .pipe(plumber())
				.pipe(gulp.dest('dist/'))
        .pipe(browserSync.reload({stream: true}));
}

// function css() {
//   return gulp.src('src/blocks/**/*.css')
//         .pipe(plumber())
//         .pipe(concat('bundle.css'))
// 				.pipe(gulp.dest('dist/'))
//         .pipe(browserSync.reload({stream: true}));
// }

function css() {
  return gulp.src('src/styles/**/*.css')
  .pipe(order([
    'globals.css',
    'variables.css',
    'style.css',
    'dark.css',
    'light.css',
    '**/*.css'
  ]))
  .pipe(plumber())
  .pipe(concat('bundle.css'))
  .pipe(gulp.dest('dist/'))
  .pipe(browserSync.reload({stream: true}));
}

function images() {
  return gulp.src('src/images/**/*.{jpg,png,svg,gif,ico,webp,avif}', { encoding: false })
    .pipe(gulp.dest('dist/images'))
    .pipe(browserSync.reload({stream: true}));
}

function fonts() {
  return gulp.src('src/fonts/**/*.{ttf,woff,woff2,svg,eot,css}', { encoding: false })
  .pipe(gulp.dest('dist/fonts'))
  .pipe(browserSync.reload({stream: true}));
}

function scripts() {
  return gulp.src('src/scripts/**/*.js')
  .pipe(gulp.dest('dist/scripts'))
  .pipe(browserSync.reload({stream: true}));
}

function clean() {
  return del('dist');
}

function watchFiles() {
  gulp.watch(['src/**/*.html'], html);
  gulp.watch(['src/styles/**/*.css'], css);
  gulp.watch(['src/images/**/*.{jpg,png,svg,gif,ico,webp,avif}'], images);
}

const build = gulp.series(clean, gulp.parallel(html, css, images, fonts, scripts));
const watchapp = gulp.parallel(build, watchFiles, serve);

exports.html = html;
exports.css = css;
exports.images = images;
exports.fonts = fonts;
exports.scripts = scripts;
exports.clean = clean;
exports.serve = serve;

exports.build = build;
exports.watchapp = watchapp;
exports.default = watchapp;