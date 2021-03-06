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
 *
 * */
const _ = require('lodash');
const fs = require('fs');
const chalk = require('chalk');
const gulp = require('gulp');
const sass = require('gulp-sass');
const config = require('../config/index');
const getPathNames = require('../utils/get-path-names.js');
const { srcPath, esPath, libPath, browsers } = config;
const autoprefixer = require('gulp-autoprefixer');
const glob = require('glob');

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

/**
 * 获取现有主题的原始数据
 * */
async function getThemeRawData() {
    const src = await getPathNames('components');

    const cache = {
        src: src
    };

    return new Promise((resolve) => {
        getPathNames('themes').then(paths => {
            paths.forEach(async function (item, index) {
                var res = await new Promise((resolve, reject) => {
                    glob(`${srcPath}/themes/${item}/components/*.scss`, {}, function (er, files) {
                        if (er) return reject(er);
                        resolve(files.map(item => item.split('/').slice(-1)[0].split('.')[0]));
                    });
                });
                cache[item] = res;
                if (index === paths.length - 1) {
                    resolve(cache);
                }
            });
        });
    });
}

function createEmptyScssFile(type = 'ios', files = []) {
    files.forEach(fileName => {
        let path = `${srcPath}/themes/${type}/components/${fileName}.${type}.scss`;
        fs.createWriteStream(path);
        fs.writeFile(path, '// empty', function (err) {
            if (err) {
                throw err;
            }
            console.log(chalk.red(`
            Because the component of '${fileName}' does not create its own theme style, 
            the build tool will create a new theme file. Please check this path.
            ${path}\n`
            ));
        });
    });
}

module.exports = async function buildStyle() {
    await getThemeRawData().then(data => {
        const src = data.src;
        delete data.src;
        const keys = Object.keys(data);
        keys.forEach(type => {
            const types = data[type];
            const diff = _.difference(src, types);
            if (diff && diff.length > 0) {
                // Notice:
                createEmptyScssFile(type, diff);
            }
        });
    });

    return new Promise(resolve => {
        gulp.doneCallback = () => {
            console.log(chalk.cyan(`[Build Style&Themes]: Done`));
            resolve();
        };
        gulp.start('style');
    });
};
