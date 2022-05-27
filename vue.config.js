const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  // 配置全局scss变量共享
  css: {
    loaderOptions: {
      scss: {
        additionalData: `
          @import "~@/styles/variables.scss";
        `
      }
    }
  },

  devServer: {
    proxy: {
      '/boss': {
        target: 'http://eduboss.lagounews.com',
        changeOrigin: true
      },
      '/front': {
        target: 'http://edufront.lagounews.com',
        changeOrigin: true
      }
    }
  }
})
