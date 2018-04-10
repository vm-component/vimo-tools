/**
 * # 处理组件中的样式
 *
 * 组件的结构如下:
 *
 * 组件结构及功能: button.js = button.vue + utils + other.vue
 * 组件基础样式(独立入口): button.scss
 * 组件皮肤(每个都是独立入口): button.ios.scss / button.md.scss / button.xx.scss
 *
 * 这里进行组件样式处理, 包括以下处理步骤:
 *
 * es:
 * - 样式原样转移(*.scss)
 *
 * lib:
 * - scss -> css + uglify + sourcemaps
 *
 * */
const gulp = require('gulp');
const sass = require('gulp-sass');
const config = require('./config');
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
