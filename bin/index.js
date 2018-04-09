#!/usr/bin/env node

/**
 * Module dependencies.
 */

const program = require('commander');
const { version } = require('../package.json');

program
    .version(version, '-v, --version')
    .command('install [name]', 'install one or more packages')
    .command('run [name]', 'install one or more packages')
    .command('build [name]', 'install one or more packages')
    .option('-p, --peppers', 'Add peppers')
    .option('-P, --pineapple', 'Add pineapple')
    .option('-b, --bbq-sauce', 'Add bbq sauce')
    .option('-c, --cheese [type]', 'Add the specified type of cheese [marble]', 'marble')
    .parse(process.argv);

console.log('you ordered a pizza with:');
if (program.peppers) console.log('  - peppers');
if (program.pineapple) console.log('  - pineapple');
if (program.bbqSauce) console.log('  - bbq');
console.log('  - %s cheese', program.cheese);
// console.log(program)
console.log(program.args);
const args = Array.from(program.args);
if (args[0] === 'build') {
    if (args[1] === 'lib') {
        // 执行lib构建
        console.log('do build lib');

    }
}
