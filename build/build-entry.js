const getComponentFileNames = require('../utils/get-path-names');
const generateEntry = require('./generate-entry');
const chalk = require('chalk');

module.exports = async function () {
    const componentsFileNames = await getComponentFileNames();

    return await Promise.all([
        generateEntry(componentsFileNames, 'src'),
        generateEntry(componentsFileNames, 'es'),
        generateEntry(componentsFileNames, 'lib'),
    ]).then(() => {
        console.log(chalk.cyan(`[Build Entry] Done!`));
    });
};
