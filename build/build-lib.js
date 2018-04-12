/**
 * Process:
 * 1. src/components/* -> rollup -> babel -> lib/components/*
 * 2. src/util/* -> babel -> lib/util/*
 * 3. src/mixins/* -> vue+babel -> lib/mixins/*
 * */
const rimraf = require('rimraf');
const chalk = require('chalk');
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

module.exports = async function buildLib() {
    await new Promise(resolve => rimraf(libPath, resolve));

    const promise0 = (async () => {
        const componentsFileNames = await getPathNames('components');
        // components
        const compLen = componentsFileNames.length;
        componentsFileNames.forEach(async (name, index) => {
            console.log(chalk.cyan(`[Build Lib] BuildComponents(${index}/${compLen - 1}): ${name}`));
            await buildJS(name, false);
        });
    })();

    // other js files
    const promise1 = new Promise(resolve => {
        gulp.doneCallback = () => {
            console.log(chalk.cyan(`[Build Lib] Babel Util Files: Done!`));
            resolve();
        };
        gulp.start('lib:util');
    });

    const promise2 = (async function () {
        const mixinsFileNames = await getPathNames('mixins');
        const mixLen = mixinsFileNames.length;
        mixinsFileNames.forEach(async (name, index) => {
            console.log(chalk.cyan(`[Build Lib] BuildMixins(${index}/${mixLen - 1}): ${name}`));
            await buildJS(name, false, 'mixins');
        });
    })();

    return Promise.all([promise0, promise1, promise2]);
};


