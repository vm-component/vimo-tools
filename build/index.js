/**
 * Used for build Lib and ES files.
 *
 * ## es:
 * 组件库, ES6模块
 *
 *  - vue sfc -> es6
 *  - no style
 *  - prettier
 *
 * ## lib:
 * 组件库, CommonJS模块, 组件作为独立入口, 不涉及样式css的打包
 *
 *  - vue sfc -> babel -> cjs
 *  - no style
 *  - sourcemaps
 *  - uglify
 * */

exports.buildLib = require('./build-lib');
exports.buildES = require('./build-es');
exports.buildStyle = require('./build-style');
exports.buildEntry = require('./build-entry');
exports.buildDist = require('./build-dist');
exports.build = async function () {
    // es/lib
    await Promise.all([exports.buildES(), exports.buildLib()]);
    exports.buildStyle();
    exports.buildEntry();
    // dist
    exports.buildDist();
};
