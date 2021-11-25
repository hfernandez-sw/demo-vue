const path = require('path');
process.env.VUE_APP_VERSION = process.env.npm_package_version || '2021.11.25';
module.exports = {
  lintOnSave: false,
  configureWebpack: {
    resolve: {
      alias: {
        '@components': path.resolve(__dirname, 'src/components'),
        '@store': path.resolve(__dirname, 'src/store'),
        '@views': path.resolve(__dirname, 'src/views'),
        '@factory': path.resolve(__dirname, 'tests/unit/factory')
      }
    },
    devtool: 'source-map',
    performance: {
      hints: false, // enum
      maxAssetSize: 1048576, // int (in bytes),
      maxEntrypointSize: 1048576 // int (in bytes)
    },

    plugins: []
  },
  productionSourceMap: false,
  css: {
    loaderOptions: {
      sass: {
        implementation: require('node-sass'),
        additionalData: `
            @import "@/assets/scss/app.scss";
            `
      }
    }
  }
};
