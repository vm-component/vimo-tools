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
        switch (module) {
            case 'es':
                buildES();
                break;
            case 'lib':
                buildLib();
                break;
            case 'style':
                buildStyle();
                break;
            case 'entry':
                buildEntry();
                break;
            case 'dist':
                buildDist();
                break;
            default:
                build();
                break;
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
        if (type === 'publish') {
            // TODO: 不确定是否有这个
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
