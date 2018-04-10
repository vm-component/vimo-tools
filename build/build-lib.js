/**
 * Process:
 * 1. src/components/* -> rollup -> babel -> lib/components/*
 * 2. src/util/* -> babel -> lib/util/*
 * 3. src/mixins/* -> babel -> lib/mixins/*
 * */
const rimraf = require('rimraf');
const gulp = require('gulp');
const babel = require('gulp-babel');
const getComponentFileNames = require('./get-components');
const buildJS = require('./build-js');
const getBabelConfig = require('./babel-config');
const { srcPath, libPath } = require('./config');

gulp.task('lib:util', function () {
    return gulp.src(`${srcPath}/util/*.js`)
        .pipe(babel(getBabelConfig('commonjs')))
        .pipe(gulp.dest(`${libPath}/util`));
});
gulp.task('lib:mixins', function () {
    return gulp.src(`${srcPath}/mixins/*.js`)
        .pipe(babel(getBabelConfig('commonjs')))
        .pipe(gulp.dest(`${libPath}/mixins`));
});

module.exports = function buildLib() {
    getComponentFileNames().then((componentsFileNames) => {
        rimraf(libPath, () => {
            // components
            componentsFileNames.forEach(name => {
                buildJS(name, false);
            });

            // other js files
            gulp.start('lib:util');
            gulp.start('lib:mixins');
        });
    });
};


