/**
 * Transfer styles:
 * src/xx/xx.scss -> transfer -> lib/xx/xx.css
 * src/xx/xx.scss -> transfer -> es/xx/xx.css
 *
 * Components styles:
 * src/components/xx.scss -> sass -> autoprefixer -> es/themes/xx.css
 * src/components/xx.scss -> sass -> autoprefixer -> lib/themes/xx.css
 *
 * Themes styles:
 * src/themes/xx.scss -> sass -> autoprefixer -> es/themes/xx.css
 * src/themes/xx.scss -> sass -> autoprefixer -> lib/themes/xx.css
 * */
const gulp = require('gulp');
const sass = require('gulp-sass');
const config = require('../config/index');
const { srcPath, esPath, libPath, browsers } = config;
const autoprefixer = require('gulp-autoprefixer');

gulp.task('style:transfer', function () {
    return gulp.src(`${srcPath}/**/*.scss`)
        .pipe(gulp.dest(`${libPath}`))
        .pipe(gulp.dest(`${esPath}`));
});

gulp.task('style', ['style:transfer'], function () {
    return gulp.src(`${srcPath}/**/*.scss`)
        .pipe(sass({
            sourceComments: false,
            outputStyle: 'compressed',
        }))
        .pipe(autoprefixer({
            browsers,
            cascade: false
        }))
        .pipe(gulp.dest(`${esPath}`))
        .pipe(gulp.dest(`${libPath}`));
});

module.exports = function buildStyle() {
    gulp.start('style');
};
