/**
 * Process:
 * 1. src/components/* -> rollup -> es/components/*
 * 2. src/util/* -> copy -> es/util/*
 * 3. src/mixins/* -> copy -> es/mixins/*
 * */
const rimraf = require('rimraf');
const chalk = require('chalk');
let copyfiles = require('copyfiles');
const getPathNames = require('../utils/get-path-names');
const buildJS = require('./build-js');
const { srcPath, esPath } = require('../config/index');

module.exports = async function buildES() {
    await new Promise(resolve => rimraf(esPath, resolve));

    const promise0 = (async () => {
        const componentsFileNames = await getPathNames('components');
        // components
        const compLen = componentsFileNames.length;
        componentsFileNames.forEach((name, index) => {
            console.log(chalk.cyan(`[Build ES] BuildComponents(${index}/${compLen - 1}): ${name}`));
            buildJS(name, true, 'components');
        });
    })();

    // transfer util files to es folder
    const promise1 = new Promise(resolve => {
        let up = srcPath.split('/').length + 1;
        copyfiles([`${srcPath}/util/*.js`, `${esPath}/util`], { up: up }, () => {
            console.log(chalk.cyan(`[Build ES] Copy Util Files: Done!`));
            resolve();
        });
    });

    const promise2 = (async function () {
        const mixinsFileNames = await getPathNames('mixins');
        const mixLen = mixinsFileNames.length;
        mixinsFileNames.forEach((name, index) => {
            console.log(chalk.cyan(`[Build ES] BuildMixins(${index}/${mixLen - 1}): ${name}`));
            buildJS(name, true, 'mixins');
        });
    })();

    return Promise.all([promise0, promise1, promise2]);
};
