module.exports = function getBabelConfig (modules = false) {
    return {
        presets: [
            [
                'env',
                {
                    modules,
                    targets: {
                        browsers: [
                            'last 2 versions',
                            'Firefox ESR',
                            '> 1%',
                            'ie >= 9',
                            'iOS >= 8',
                            'Android >= 4',
                        ],
                    },
                }
            ],
            'stage-2'
        ]
    };
};
