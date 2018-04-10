var path = require('path');
const dirname = process.env.PWD;
const res = {
    srcPath: path.resolve(dirname, 'src'),
    esPath: path.resolve(dirname, 'es'),
    libPath: path.resolve(dirname, 'lib'),
    browsers:[
        'last 2 versions',
        'Firefox ESR',
        '> 1%',
        'ie >= 9',
        'iOS >= 8',
        'Android >= 4',
    ]
};

module.exports = res;
