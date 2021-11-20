// https://cli.vuejs.org/config/#global-cli-config
module.exports = {
  lintOnSave: false,
  publicPath: '',
  outputDir: 'dist',
  assetsDir: '',
  runtimeCompiler: false,
  productionSourceMap: true,
  parallel: true,

  css: {
    sourceMap: true
  },

  // webpackの設定 https://cli.vuejs.org/guide/webpack.html#simple-configuration
  configureWebpack: {
    performance: {
      hints: false // サイズ警告を無視
    }
  },

  pages: {
    index: { // メニュー画面
      entry: 'src/init.js', // エントリーポイントとなるjs
      template: 'src/template/index.html', // テンプレートのHTML
      filename: 'index.html', // build時に出力されるファイル名
    },
  }
};
