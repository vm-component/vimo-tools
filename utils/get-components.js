const fs = require('fs');
const config = require('../config/index');
const { srcPath } = config;
let cache = [];

module.exports = function getComponents() {
    return new Promise((resolve, reject) => {
        if (cache.length === 0) {
            fs.readdir(`${srcPath}/components`, function (err, files) {
                if (err) {
                    reject(err);
                    throw err;
                }

                // ignore hidden file or private file, eg: .DS_Store / _tmp
                let filterCondition = (fileName) => {
                    return fileName.indexOf('.') === -1 && fileName.indexOf('_') !== 0;
                };

                // file names
                let componentsFileNames = files.filter((fileName) => filterCondition(fileName));
                cache = componentsFileNames;
                resolve && resolve(cache);
            });
        } else {
            resolve && resolve(cache);
        }
    });
};
