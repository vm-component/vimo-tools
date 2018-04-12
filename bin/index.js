#!/usr/bin/env node

/**
 * The Tools Entries!
 */
const program = require('commander');
const { version, name } = require('../package.json');
const { build, buildLib, buildES, buildStyle, buildEntry, buildDist } = require('../build/index');
const { demoDev, demoBuild } = require('../demo/index');

program
    .version(version, '-v, --version')
    .name(name);

program
    .command('run [task]')
    .description('run task commands for vimo')
    .action(function (task) {
        task = task || 'dev';
        console.log('run %s task', task);
    });

program
    .command('build [module]')
    .description('构建发布模块')
    .action(function (module) {
        if (module === 'es') {
            buildES();
        }
        if (module === 'lib') {
            buildLib();
        }
        if (module === 'style') {
            buildStyle();
        }
        if (module === 'entry') {
            buildEntry();
        }
        if (module === 'dist') {
            // TODO: do it later
            buildDist();
        }

        if (module === undefined) {
            // TODO: 完成完整的build构建编排, es/lib/dist/style/entry
            build()
        }
    });

program
    .command('demo [type]')
    .description('构建DEMO展示模块')
    .action(function (type) {
        if (type === 'dev') {
            demoDev();
        }
        if (type === 'build') {
            demoBuild();
        }
    });

// program
//     .command('lint [ext]')
//     .description('lint the module')
//     .action(function (ext) {
//         console.log('lint module of "%s"', ext);
//         const eslint = require('eslint')
//         if (ext === 'style') {
//
//         }
//         if (ext === 'vue') {
//
//         }
//         if (ext === 'js') {
//
//         }
//         if (ext === 'md') {
//
//         }
//     });

program.parse(process.argv);

// https://github.com/tj/commander.js/pull/260
const proc = program.runningCommand;
if (proc) {
    proc.on('close', process.exit.bind(process));
    proc.on('error', () => {
        process.exit(1);
    });
}
