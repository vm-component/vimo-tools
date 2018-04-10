var path = require('path');
const dirname = process.env.PWD;
const res = {
    srcPath: path.resolve(dirname, 'src'),
    esPath: path.resolve(dirname, 'es'),
    libPath: path.resolve(dirname, 'lib'),
};

module.exports = res;
