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

program
    .command('lint [ext]')
    .description('lint the module')
    .action(function (ext) {
        console.log('build module of "%s"', ext);
        if (ext === 'css') {

        }
        if (ext === 'scss') {

        }
        if (ext === 'js') {

        }
        if (ext === 'md') {

        }
        if (ext === 'vue') {

        }
    });

program
    .command('generate theme')
    .description('generate the theme')
    .action(function () {
        console.log('generate theme of ');
    });

program.parse(process.argv);

// https://github.com/tj/commander.js/pull/260
const proc = program.runningCommand;
if (proc) {
    proc.on('close', process.exit.bind(process));
    proc.on('error', () => {
        process.exit(1);
    });
}
