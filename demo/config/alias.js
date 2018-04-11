const path = require('path');
const { projectRoot } = require('../../config');

function resolve(dir) {
    return path.join(projectRoot, dir);
}

// 常用部分提取
const res = {
    'vue$': 'vue/dist/vue.esm.js',
    '@': resolve('demo/src'),
    '@DemoComponent': resolve('demo/src/components'),
    '@PageComponent': resolve('src/components'),
    'vimo': resolve('src'),
    'vimo-theme-ios': resolve('src/themes/ios'),
    'vimo-theme-md': resolve('src/themes/md'),
    'vimo-theme-wp': resolve('src/themes/wp'),
};

// { 'vue$': 'vue/dist/vue.esm.js',
//     '@': '/Users/Hsiang/GitHub/vimo/demo/src',
//     '@PageComponent': '/Users/Hsiang/GitHub/vimo/src/components',
//     vimo: '/Users/Hsiang/GitHub/vimo/src',
//     'vimo-theme-ios': '/Users/Hsiang/GitHub/vimo/src/themes/ios',
//     'vimo-theme-md': '/Users/Hsiang/GitHub/vimo/src/themes/md',
//     'vimo-theme-wp': '/Users/Hsiang/GitHub/vimo/src/themes/wp' }

module.exports = res;
