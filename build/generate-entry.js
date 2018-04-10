/**
 * 根据组件名称自动生成lib的entry
 * */
const fs = require('fs');
const startcase = require('lodash.startcase');
const { esPath, libPath } = require('../config/index');
const getBabelConfig = require('./babel-config');
const babel = require('babel-core');

/**
 * @param {Array} fileNames - 文件名称列表
 * @param {Boolean} [isEsBoundle=true] - ES
 * @return {Promise}
 * */
module.exports = function buildEntry(fileNames, isEsBoundle = true) {
    const path = isEsBoundle ? esPath : libPath;
    return new Promise((resolve, reject) => {
        if (!Array.isArray(fileNames)) {
            let err = new Error(`generateEntry: the params of fileNames must pass in a array, but got a ${typeof fileNames}!`);
            reject(err);
            throw err;
        }
        let startcaseNames = [];
        let importString = '/** this file is generate automatic by ./build/generate-entry.js */\n';
        fileNames.forEach(function (item) {
            let _startcase = startcase(item).split(' ').join('');
            let _importString = `export { default as ${_startcase} } from './components/${item}'\n`;
            startcaseNames.push(_startcase);
            importString += _importString;
        });

        // TODO: install.js
        // importString += `export { default as Install } from './components/install.js'\n`;

        importString += `\nvar ENV = process.env.NODE_ENV
if (ENV && ENV !== 'production' && ENV !== 'test' && typeof console !== 'undefined' && console.warn && typeof window !== 'undefined') {
  console.warn('You are using a whole package of vimo, ' + 'please read docs https://vm-component.github.io/babel-plugin-vimo/ to reduce app bundle size.')
}
`;

        if (!isEsBoundle) {
            // need babel
            const res = babel.transform(importString, getBabelConfig('commonjs'));
            importString = res.code;
        }

        fs.createWriteStream(`${path}/index.js`);
        fs.writeFile(`${path}/index.js`, importString, function (err) {
            if (err) {
                reject(err);
                throw err;
            }
            resolve && resolve();
        });
    });
};
