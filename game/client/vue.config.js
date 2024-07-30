const path = require('path');
const {defineConfig} = require('@vue/cli-service')

module.exports = defineConfig({
    configureWebpack: {
        resolve: {
            alias: {
                'shared': path.resolve(__dirname, '../shared')
            }
        }
    },
    transpileDependencies: true,
    pages: {
        index: {
            entry: 'src/main.ts',
            title: `[${process.env.VUE_APP_MODE}] Simple Adventure`
        }
    }
})
