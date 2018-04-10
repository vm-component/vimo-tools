/**
 * # 下面的打包模式只是针对html+js, 不涉及样式css的打包
 *
 * ## es:
 * 组件库, 开发模式, 整体引入模式
 *
 *  - vue sfc -> es6
 *  - no style
 *  - prettier
 *
 * ## lib:
 * 组件, 单独使用, 需要依赖的组件及资源全部打包组件中, 组件作为独立入口, 不涉及样式css的打包
 *
 *  - vue sfc -> buble -> es5
 *  - no style
 *  - sourcemaps
 *  - uglify
 * */

const buildStyle = require('./build-style');
const buildES = require('./build-es');
const buildLib = require('./build-lib');
const buildEntry = require('./build-entry');

exports.buildLib = buildLib;
exports.buildES = buildES;
exports.buildStyle = buildStyle;
exports.buildEntry = buildEntry;
