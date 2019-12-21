module.exports = {
  mode: 'development',
  entry: {
    index: './src/js/index.js'
  },
  output: {
    filename: "[name].js"
  },
  // devtool: "source-map",
  resolve: {
    extensions: ['.js']
  },
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader',
        options: {
          babelrc: false, // 不采用.babelrc的配置
          presets: ['@babel/preset-env'],
          plugins: []
        }
      }
    }]
  }
}