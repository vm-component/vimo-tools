const getComponentFileNames = require('../utils/get-components');
const generateEntry = require('./generate-entry');

module.exports = function () {
    getComponentFileNames().then((componentsFileNames) => {
        generateEntry(componentsFileNames, true);
        generateEntry(componentsFileNames, false);
    });
};
