/**
 * Translate SFC to JS use rollup!
 * */
const startcase = require('lodash.startcase');
const rollup = require('rollup');
const resolve = require('rollup-plugin-node-resolve');
const vue = require('rollup-plugin-vue');
const babel = require('rollup-plugin-babel');
const sourceMaps = require('rollup-plugin-sourcemaps');
const uglify = require('rollup-plugin-uglify');
const prettier = require('rollup-plugin-prettier');
const { srcPath, esPath, libPath } = require('./config');
const getBabelConfig = require('./babel-config');

/**
 * @name buildJS
 * @param {String} componentName - The name of component
 * @param {Boolean} [isEsBoundle=true] - is buld Es Module?
 * */
module.exports = async function buildJS(componentName, isEsBoundle = true) {

    // The entry of components: xx/index.js
    const inputPath = `${srcPath}/components/${componentName}/index.js`;
    const outputESPath = `${esPath}/components/${componentName}/index.js`;
    const outputLibPath = `${libPath}/components/${componentName}/index.js`;

    // action-sheet => ActionSheet
    const outputName = startcase(componentName).split(' ').join('');

    let inputOptions = {
        input: inputPath,
        external(id) {
            // console.log(id + '----', componentName);
            // 当前组件文件夹下的资源将不认为是external
            return !(id.indexOf(`components/${componentName}`) > -1 || /(^\.\/)/.test(id));
        },
        plugins: [
            vue({
                compileTemplate: true,
                css: false
            }),
            resolve()
        ]
    };
    let outputOptions = {};

    if (!isEsBoundle) {
        // for lib
        inputOptions.plugins.push(
            // uglify({
            //     warnings: false,
            //     compress: {
            //         drop_console: true
            //     },
            //     sourceMap: true
            // }),
            babel(getBabelConfig(false)),
            sourceMaps(),
        );

        outputOptions = {
            file: outputLibPath,
            name: outputName,
            format: 'cjs',
            sourcemap: true,
        };
    } else {
        // for ES
        inputOptions.plugins.push(
            prettier({
                tabWidth: 2,
                singleQuote: false,
            }),
        );

        outputOptions = {
            file: outputESPath,
            format: 'es',
        };
    }

    // create a bundle
    try {
        const bundle = await rollup.rollup(inputOptions);
        // or write the bundle to disk
        await bundle.write(outputOptions);
    }
    catch (e) {
        console.error(`Error occurs when rollup component of ${componentName}, more details here:`);
        console.error(e);
    }
};