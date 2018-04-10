/**
 * Process:
 * 1. src/components/* -> rollup -> es/components/*
 * 2. src/util/* -> copy -> es/util/*
 * 3. src/mixins/* -> copy -> es/mixins/*
 * */
const rimraf = require('rimraf');
const getComponentFileNames = require('../utils/get-components');
const buildJS = require('./build-js');
const { srcPath, esPath } = require('../config/index');

module.exports = function buildES() {
    getComponentFileNames().then((componentsFileNames) => {
        rimraf(esPath, () => {
            // componentsFileNames = ['content', 'datetime'];
            componentsFileNames.forEach(name => {
                buildJS(name, true);
            });

            // transfer util && mixins files to es folder
            let copyfiles = require('copyfiles');
            let up = srcPath.split('/').length + 1;
            copyfiles([`${srcPath}/util/*.js`, `${esPath}/util`], { up: up }, () => {
                // console.log('util move done');
            });
            copyfiles([`${srcPath}/mixins/*.js`, `${esPath}/mixins`], { up: up }, () => {
                // console.log('mixins move done');
            });
        });
    });
};
