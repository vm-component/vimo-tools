#!/usr/bin/env node

/**
 * The Tools Entries!
 */
const program = require('commander');
const { version, name } = require('../package.json');
const { buildLib, buildES, buildStyle, buildEntry } = require('../build/index');

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
    .description('build the module')
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
