const { browsers } = require('./config');

module.exports = function getBabelConfig(modules = false) {
    return {
        presets: [
            [
                'env',
                {
                    modules,
                    targets: {
                        browsers,
                    },
                }
            ],
            'stage-2'
        ]
    };
};
