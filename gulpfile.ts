import * as del from 'del';
import * as gulp from 'gulp';
import * as runSequence from 'run-sequence';
import * as sourceMaps from 'gulp-sourcemaps';
import * as tsc from 'gulp-typescript';
import * as uglify from 'gulp-uglify';
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const babelify = require('babelify')
const browserify = require('browserify');
/**
* Remove dist directory.
*/
gulp.task("clean", (done: any) => {
  return del(["dist"], done);
});


/**
* Build the server.
*/
gulp.task("build:fsLib", () => {

  const project = tsc.createProject("tsconfig.json");
  const result = gulp.src(["src/*.ts"])
    .pipe(sourceMaps.init())
    .pipe(project());
  return result.js
    // .pipe(uglify({
    //     compress: {
    //         drop_console: true
    //    }
    // }))
    .pipe(sourceMaps.write("", { addComment: false }))
    .pipe(gulp.dest("dist"));
});


gulp.task('scripts', () => {
  browserify({ entries: 'dist/index.js' })
    .transform(babelify)
    .bundle()
    .pipe(source('index.js'))
    .pipe(buffer())
    .pipe(uglify({
      compress: {
        drop_console: true
      }
    }))
    .pipe(gulp.dest('dist/'))
  // You need this if you want to continue using the stream with other plugins
});

/**
* Build the project.
*/
gulp.task("default", (done: any) => {
  runSequence("clean", "build:fsLib", "scripts");
});