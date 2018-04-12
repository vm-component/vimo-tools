const getComponentFileNames = require('../utils/get-path-names');
const generateEntry = require('./generate-entry');
const chalk = require('chalk');

module.exports = async function () {
    const componentsFileNames = await getComponentFileNames();

    return await Promise.all([
        generateEntry(componentsFileNames, true),
        generateEntry(componentsFileNames, false),
    ]).then(() => {
        console.log(chalk.cyan(`[Build Entry] Done!`));
    });
};
