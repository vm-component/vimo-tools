/**
 * Process:
 * 1. src/components/* -> rollup -> babel -> lib/components/*
 * 2. src/util/* -> babel -> lib/util/*
 * 3. src/mixins/* -> babel -> lib/mixins/*
 * */
const rimraf = require('rimraf');
const gulp = require('gulp');
const babel = require('gulp-babel');
const getPathNames = require('../utils/get-path-names');
const buildJS = require('./build-js');
const getBabelConfig = require('./babel-config');
const { srcPath, libPath } = require('../config/index');

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
    rimraf(libPath, () => {
        getPathNames('components').then((componentsFileNames) => {
            // components
            componentsFileNames.forEach(name => {
                buildJS(name, false);
            });

            // other js files
            gulp.start('lib:util');
            gulp.start('lib:mixins');
        });
        getPathNames('mixins').then((mixinsFileNames) => {
            mixinsFileNames.forEach(name => {
                buildJS(name, false, 'mixins');
            });
        });
    });
};


