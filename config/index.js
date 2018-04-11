const path = require('path');

// project pwd, not vimo-tools
const projectRoot = process.env.PWD;

const res = {
    projectRoot,
    srcPath: path.resolve(projectRoot, 'src'),
    esPath: path.resolve(projectRoot, 'es'),
    libPath: path.resolve(projectRoot, 'lib'),
    browsers: [
        'last 2 versions',
        'Firefox ESR',
        '> 1%',
        'ie >= 9',
        'iOS >= 8',
        'Android >= 4',
    ]
};

module.exports = res;
