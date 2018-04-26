/**
 * vue+js -> rollup+babel
 * */
const chalk = require('chalk')
const gulp = require('gulp')
const concat = require('gulp-concat')
const sass = require('gulp-sass')
const getPathNames = require('../utils/get-path-names.js')
const autoprefixer = require('gulp-autoprefixer')
const json = require('rollup-plugin-json')

const getComponentFileNames = require('../utils/get-path-names')
const generateEntry = require('./generate-entry')
const {projectRoot, srcPath, browsers, distPath} = require('../config/index')
const {name, version, description, author, license, homepage} = require(`${projectRoot}/package.json`)

const startcase = require('lodash.startcase')
const rimraf = require('rimraf')
const rollup = require('rollup')
const resolve = require('rollup-plugin-node-resolve')
const vue = require('rollup-plugin-vue')
const babel = require('rollup-plugin-babel')
const sourceMaps = require('rollup-plugin-sourcemaps')
const uglify = require('rollup-plugin-uglify')
const getBabelConfig = require('./babel-config')

const format = 'umd'
const boundaryName = startcase(name)
const inputPath = `${srcPath}/index.js`
const outputLibPath = `${distPath}/vimo.${format}.min.js`

const banner = `/*!
 * ${boundaryName} v${version}
 * ${description}
 * (c) 2016-${new Date().getFullYear()} ${author}
 * Released under the ${license} License.
 * More Information here: ${homepage}
 */`

async function buildDistJS () {
  const componentsFileNames = await getComponentFileNames()
  await generateEntry(componentsFileNames, 'src')

  let inputOptions = {
    input: inputPath,
    plugins: [
      json(),
      vue({
        compileTemplate: true,
        css: false
      }),
      uglify({
        warnings: true,
        compress: {
          drop_console: true
        },
        sourceMap: true,
        output: {
          comments: 'all'
        }
      }),
      babel(getBabelConfig(false)),
      // sourceMaps(),
      resolve()
    ]
  }

  let outputOptions = {
    file: outputLibPath,
    name: boundaryName,
    format: format,
    sourcemap: true,
    banner
  }

  // create a bundle
  try {
    const bundle = await rollup.rollup(inputOptions)
    // or write the bundle to disk
    await bundle.write(outputOptions)
    console.log(chalk.cyan('[Build Dist] buildDistJS done!'))
  } catch (e) {
    console.error(`Error occurs when rollup dist bundle, more details here:`)
    console.error(e)
  }
}

async function buildDistStyle () {
  gulp.src(`${srcPath}/components/**/*.scss`)
  .pipe(sass({
    sourceComments: false,
    outputStyle: 'compressed'
  }))
  .pipe(autoprefixer({
    browsers,
    cascade: false
  }))
  .pipe(concat('style.min.css'))
  .pipe(gulp.dest(`${distPath}`))

  console.log(chalk.cyan('[Build Dist] buildDistStyle done!'))
}

async function buildDistThemes () {
  const themePaths = await getPathNames('themes') || []
  themePaths.forEach((themePathName) => {
    const pathGlob = `${srcPath}/themes/${themePathName}/**/*.scss`
    gulp.src(pathGlob)
    .pipe(sass({
      sourceComments: false,
      outputStyle: 'compressed'
    }))
    .pipe(autoprefixer({
      browsers,
      cascade: false
    }))
    .pipe(concat(`theme.${themePathName}.min.css`))
    .pipe(gulp.dest(`${distPath}`))
  })
  console.log(chalk.cyan('[Build Dist] buildDistThemes done!'))
}

module.exports = async function buildDist () {
  await new Promise(resolve => rimraf(distPath, resolve))
  return Promise.all([buildDistJS(), buildDistStyle(), buildDistThemes()]).then(() => {
    console.log(chalk.cyan('[Build Dist] all done!'))
  })
}
