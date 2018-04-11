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

exports.demoDev = function () {
    console.log('here demoDev');
    require('./build/dev-server');
};

exports.demoBuild = function () {
    console.log('here demoBuild');
    require('./build/build');
};
