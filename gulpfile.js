'use strict';

let gulp = require("gulp");
let sourcemaps = require("gulp-sourcemaps");
let babel = require("gulp-babel");
let concat = require("gulp-concat");

gulp.task("default", function () {
  return gulp.src("src/components/*.js")
    .pipe(sourcemaps.init())
    .pipe(babel())
    .pipe(concat("acessibility.js"))
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest("dist"));
});

