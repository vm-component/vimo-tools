/**
 * vue+js -> rollup+babel
 * */
const getComponentFileNames = require('../utils/get-path-names');
const generateEntry = require('./generate-entry');
const { projectRoot, srcPath, distPath } = require('../config/index');
const { name, version, description, author, license, homepage } = require(`${projectRoot}/package.json`);

const startcase = require('lodash.startcase');
const rimraf = require('rimraf');
const rollup = require('rollup');
const resolve = require('rollup-plugin-node-resolve');
const vue = require('rollup-plugin-vue');
const babel = require('rollup-plugin-babel');
const sourceMaps = require('rollup-plugin-sourcemaps');
const uglify = require('rollup-plugin-uglify');
const getBabelConfig = require('./babel-config');

const format = 'umd';
const boundaryName = startcase(name);
const inputPath = `${srcPath}/index.js`;
const outputLibPath = `${distPath}/vimo.umd.js`;

const banner = `/*!
 * ${boundaryName} v${version}
 * ${description}
 * (c) 2016-${new Date().getFullYear()} ${author}
 * Released under the ${license} License.
 * More Information here: ${homepage}
 */`;

module.exports = async function buildDist() {
    await new Promise(resolve => rimraf(distPath, resolve));

    const componentsFileNames = await getComponentFileNames();
    await generateEntry(componentsFileNames, 'src');

    let inputOptions = {
        input: inputPath,
        plugins: [
            vue({
                compileTemplate: true,
                css: false
            }),
            uglify({
                warnings: false,
                compress: {
                    drop_console: true
                },
                sourceMap: true,
                output: {
                    comments: 'all',
                },
            }),
            babel(getBabelConfig(false)),
            sourceMaps(),
            resolve()
        ]
    };

    let outputOptions = {
        file: outputLibPath,
        name: boundaryName,
        format: format,
        sourcemap: true,
        banner,
    };

    // create a bundle
    try {
        const bundle = await rollup.rollup(inputOptions);
        // or write the bundle to disk
        await bundle.write(outputOptions);
    } catch (e) {
        console.error(`Error occurs when rollup dist bundle, more details here:`);
        console.error(e);
    }

};
