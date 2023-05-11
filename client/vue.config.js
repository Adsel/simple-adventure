const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  transpileDependencies: true,
  pages: {
    index: {
      entry: 'src/main.ts',
      title: `[${process.env.VUE_APP_MODE}] Simple Adventure`
    }
  }
})
