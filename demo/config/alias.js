const path = require('path');
const { projectRoot } = require('../../config');

function resolve(dir) {
    return path.join(projectRoot, dir);
}

console.log("resolve('src')")
console.log(resolve('src'))

// 常用部分提取
const res = {
    'vue$': 'vue/dist/vue.esm.js',
    '@': resolve('demo/src'),
    '@PageComponent': resolve('src/components'),
    'vimo': resolve('es'),
    'vimo-theme-ios': resolve('es/themes/ios'),
    'vimo-theme-md': resolve('es/themes/md'),
    'vimo-theme-wp': resolve('es/themes/wp'),
};

// console.log(res);

// { 'vue$': 'vue/dist/vue.esm.js',
//     '@': '/Users/Hsiang/GitHub/vimo/demo/src',
//     '@PageComponent': '/Users/Hsiang/GitHub/vimo/src/components',
//     vimo: '/Users/Hsiang/GitHub/vimo/src',
//     'vimo-theme-ios': '/Users/Hsiang/GitHub/vimo/src/themes/ios',
//     'vimo-theme-md': '/Users/Hsiang/GitHub/vimo/src/themes/md',
//     'vimo-theme-wp': '/Users/Hsiang/GitHub/vimo/src/themes/wp' }

module.exports = res;
