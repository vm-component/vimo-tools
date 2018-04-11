/**
 * Process:
 * 1. src/components/* -> rollup -> es/components/*
 * 2. src/util/* -> copy -> es/util/*
 * 3. src/mixins/* -> copy -> es/mixins/*
 * */
const rimraf = require('rimraf');
const getPathNames = require('../utils/get-path-names');
const buildJS = require('./build-js');
const { srcPath, esPath } = require('../config/index');

module.exports = function buildES() {
    rimraf(esPath, () => {
        getPathNames('components').then((componentsFileNames) => {
            // componentsFileNames = ['content', 'datetime'];
            componentsFileNames.forEach(name => {
                buildJS(name, true, 'components');
            });

            // transfer util && mixins files to es folder
            let copyfiles = require('copyfiles');
            let up = srcPath.split('/').length + 1;
            copyfiles([`${srcPath}/util/*.js`, `${esPath}/util`], { up: up }, () => {
                // console.log('util move done');
            });
        });
        getPathNames('mixins').then((mixinsFileNames) => {
            mixinsFileNames.forEach(name => {
                buildJS(name, true, 'mixins');
            });
        });
    });
};
