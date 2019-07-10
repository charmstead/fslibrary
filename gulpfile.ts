import * as del from 'del';
import * as gulp from 'gulp';
import * as runSequence from 'run-sequence';
import * as sourceMaps from 'gulp-sourcemaps';
import * as tsc from 'gulp-typescript';
import * as uglify from 'gulp-uglify';


/**
* Remove dist directory.
*/
gulp.task("clean", (done:any) => {
return del(["dist"], done);
});


/**
* Build the server.
*/
gulp.task("build:fsLib", () => {
const project = tsc.createProject("tsconfig.json");
const result = gulp.src(["src/*.ts"])
// .pipe(sourceMaps.init())
.pipe(project());
return result.js
// .pipe(uglify({
//     compress: {
//         drop_console: true
//    }
// }))
// .pipe(sourceMaps.write("dist",{addComment: true}))
.pipe(gulp.dest("dist"));
});


/**
* Build the project.
*/
gulp.task("default", (done:any) => {
    runSequence("clean","build:fsLib");
});