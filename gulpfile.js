//Declarations
const gulp = require("gulp");
const { src, dest, watch, series } = require("gulp");
const sass = require("gulp-dart-sass");
const postcss = require("gulp-postcss");
const cssnano = require("cssnano");
const browsersync = require("browser-sync").create();
const autoprefixer = require("autoprefixer");
const rename = require("gulp-rename");

//CSS tasks
function cssTask() {
  return gulp
    .src("./src/styles/main.scss")
    .pipe(sass().on("error", sass.logError))
    .pipe(gulp.dest("./dist/css"))
    .pipe(postcss([autoprefixer(), cssnano()]))
    .pipe(
      rename({
        extname: ".min.css",
      })
    )
    .pipe(gulp.dest("./dist/css"));
}

//Javascript tasks
// async function babelTask() {
//   src("src/scripts/**/*.js")
//     .pipe(
//       babel({
//         presets: ["@babel/preset-env"],
//       })
//     )
//     .pipe(terser())
//     .pipe(dest("dist/scripts"));
// }

//Browser tasks
function browsersyncServer(cb) {
  browsersync.init({
    server: {
      baseDir: ".",
    },
  });
  cb();
}

//Reload on save
function browsersyncReload(cb) {
  browsersync.reload();
  cb();
}

// Watch Task
function watchTask() {
  watch(["*html", "src/html/**/*.html"], browsersyncReload);
  watch(["src/styles/**/*.scss"], series(cssTask, browsersyncReload));
}

// Default Gulp Task
exports.default = series(cssTask, browsersyncServer, watchTask);
