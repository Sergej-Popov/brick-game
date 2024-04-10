const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const WorkboxWebpackPlugin = require('workbox-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = (env) => ({
  mode: env.mode ?? 'development',
  entry: './src/index.ts',
  devServer: {
    static: path.join(__dirname, 'public'),
    historyApiFallback: true,
    hot: true
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: '3Brick game 9999 in 1',
      template: 'public/index.html',
      favicon: 'public/favicon.ico'
    }),
    new webpack.SourceMapDevToolPlugin({
      filename: '[name].[contenthash].map'
    }),
    new CopyWebpackPlugin({
      patterns: [
        { from: 'public/manifest.json', to: 'manifest.json' },
        { from: 'public/clover.svg', to: 'clover.svg' }
      ]
    }),
    new WorkboxWebpackPlugin.GenerateSW({
      clientsClaim: true,
      skipWaiting: true,
      // Define runtime caching rules.
      runtimeCaching: [{
        urlPattern: new RegExp('\.html$'),
        handler: 'NetworkFirst'
      }, {
        // Cache CSS and JS files
        urlPattern: new RegExp('\.(?:js|css)$'),
        handler: 'StaleWhileRevalidate',
      }, {
        // Caching for other assets
        urlPattern: new RegExp('\.(?:png|jpg|jpeg|svg|gif)$'),
        handler: 'CacheFirst',
        options: {
          cacheName: 'images',
          expiration: {
            maxEntries: 10,
          },
        },
      }],
    }),
  ],
  output: {
    filename: '[name].[contenthash].js',
    path: path.resolve(__dirname, 'dist'),
    clean: true
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    modules: [
      'node_modules',
      path.resolve(__dirname, 'src')
    ],
    alias: {
      '~': path.resolve(__dirname, 'src')
    }
  },
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: ['style-loader', 'css-loader', 'sass-loader']
      },
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        include: path.resolve(__dirname, 'src'),
        exclude: /node_modules/
      }
    ]
  },
  optimization: {
    // moduleIds: 'deterministic',
    // runtimeChunk: 'single',
    // splitChunks: {
    //     cacheGroups: {
    //         vendor: {
    //             test: /[\\/]node_modules[\\/]/,
    //             name: 'vendors',
    //             chunks: 'all',
    //         },
    //     },
    // },
    // usedExports: true,
  }
});
