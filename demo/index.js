/**
 * 运行模式
 *
 * demo:dev
 * demo:build
 * ?demo:analysis
 * ?demo:lint
 *
 * site:dev
 * site:build
 * */

const glob = require('glob');
const fs = require('fs');
const _ = require('lodash');
const { projectRoot } = require('../config');
const standard = require('standard');

/**
 * 读取 demo/src/components/*.vue 中的文件生成 route.js 路由文件
 * */
function generateRouteFile() {
    return new Promise((resolve, reject) => {
        const componentFilePath = `${projectRoot}/demo/src/components/*.vue`;
        glob(componentFilePath, {}, (err, files) => {
            if (err) {
                reject(err);
                throw err;
            }
            const _fileNotice = `/** this file is generate automatic! */\n`;
            const _fileStart = `${_fileNotice}export default [`;
            const _fileEnd = `]`;
            const _fileContent = [];
            files.forEach(fileName => {
                const _fileFullName = fileName.split('/').slice(-1)[0];
                const _fileName = _fileFullName.split('.')[0];

                // action-sheet => ActionSheet
                const camelCaseFilename = _.camelCase(_fileName);
                const _content = `
                    {
                        path: '/${_fileName}',
                        name: '${camelCaseFilename}',
                        component(resolve) {
                            require(['@DemoComponent/${_fileFullName}'], resolve)
                        }
                    }
            `;
                _fileContent.push(_content);
            });
            const _resRaw = `${_fileStart}${_fileContent.join(',')}${_fileEnd}`;
            const _res = standard.lintTextSync(_resRaw, { fix: true });

            const _distRouteFilePath = `${projectRoot}/demo/src/route.js`;
            fs.createWriteStream(_distRouteFilePath);
            fs.writeFile(_distRouteFilePath, _res.results[0].output, function (err) {
                if (err) {
                    reject(err);
                    throw err;
                }
                resolve && resolve();
                console.log('done1');
            });
        });
    });
}

exports.demoDev = async function () {
    console.log('here demoDev');
    await generateRouteFile();
    require('./build/dev-server');
};

exports.demoBuild = async function () {
    console.log('here demoBuild');
    await generateRouteFile();
    require('./build/build');
};
