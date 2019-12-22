const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
 

module.exports = {
  mode: 'development',
  entry: {
    index: './src/js/index.js',
    ad: './src/aaa/ad.js'
  },
  output: {
    filename: "[name]-[hash].js"
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
  },
  plugins: [
    new BundleAnalyzerPlugin({
      analyzerMode: 'static'
    })
  ],
  // 都TM是有关分离模块的东西
  optimization: {
    runtimeChunk: 'single', 
    splitChunks: {
      cacheGroups: {
        //将node_modules中的文件单独抽抽出来
        vendors: {
          chunks: 'initial',
          test: /[\\/]node_modules[\\/]/,
          name:'vendors',
          priority: -10
        },
        // ad: {
        //   chunks: 'all',
        //   minChunks:2,
        //   name:"ad",
        //   priority: -10
        // }
      }
    }
  }
}