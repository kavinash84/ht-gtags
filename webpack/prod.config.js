// require('babel-polyfill');

// Webpack config for creating the production bundle.
var path = require('path');
const fs = require('fs');
var webpack = require('webpack');

// var CleanPlugin = require('clean-webpack-plugin');
var ReactLoadablePlugin = require('react-loadable/webpack').ReactLoadablePlugin;
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var projectRootPath = path.resolve(__dirname, '../');
var assetsPath = path.resolve(projectRootPath, './static/dist');

// https://github.com/halt-hammerzeit/webpack-isomorphic-tools
var WebpackIsomorphicToolsPlugin = require('webpack-isomorphic-tools/plugin');
var webpackIsomorphicToolsPlugin = new WebpackIsomorphicToolsPlugin(require('./webpack-isomorphic-tools'));

var SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
const CompressionPlugin = require("compression-webpack-plugin");
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
var WebpackOnBuildPlugin = require('on-build-webpack');

var S3Plugin = require('webpack-s3-plugin')

var version = require('../package.json').version;


module.exports = {
  devtool: 'source-map',
  context: path.resolve(__dirname, '..'),
  entry: {
    main: [
      './src/client.js'
    ]
  },
  output: {
    path: `${assetsPath}/${version}`,
    filename: '[name]-[chunkhash].js',
    chunkFilename: '[name]-[chunkhash].chunk.js',
    publicPath:  `/dist/${version}/`
  },
  performance: {
    hints: false
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },{
        test: /\.css$/,
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
            loader: 'css-loader'
          }]
        }),
        include: [path.resolve(__dirname, '../src'), path.resolve(__dirname, '../node_modules')]
      },{
        test: /\.less$/,
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                modules: true,
                importLoaders: 2,
                sourceMap: true
              }
            }, {
              loader: 'postcss-loader',
              options: {
                sourceMap: true
              }
            }, {
              loader: 'less-loader',
              options: {
                outputStyle: 'expanded',
                sourceMap: true,
                sourceMapContents: true
              }
            }
          ]
        })
      }, {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                modules: true,
                importLoaders: 2,
                sourceMap: true
              }
            }, {
              loader: 'postcss-loader',
              options: {
                sourceMap: true
              }
            }, {
              loader: 'sass-loader',
              options: {
                outputStyle: 'expanded',
                sourceMap: true,
                sourceMapContents: true
              }
            }
          ]
        })
      },{
        test: /\.woff2?(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader',
        options: {
          limit: 10240,
          mimetype: 'application/font-woff'
        }
      }, {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader',
        options: {
          limit: 10240,
          mimetype: 'application/octet-stream'
        }
      }, {
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'file-loader'
      }, {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader',
        options: {
          limit: 10240,
          mimetype: 'image/svg+xml'
        }
      }, {
        test: webpackIsomorphicToolsPlugin.regular_expression('images'),
        loader: 'url-loader',
        options: {
          limit: 10240
        }
      }
    ]
  },
  resolve: {
    modules: [
      'src',
      'node_modules'
    ],
    extensions: ['.json', '.js', '.jsx']
  },
  plugins: [
    new webpack.LoaderOptionsPlugin({
      test: /\.(less|scss)/,
      options: {
        postcss: function (webpack) {
          return [
            require("postcss-import")({ addDependencyTo: webpack }),
            require("postcss-url")(),
            require("postcss-cssnext")({ browsers: 'last 2 version' }),
            require('lost')(),
            // add your "plugins" here
            // ...
            // and if you want to compress,
            // just use css-loader option that already use cssnano under the hood
            require("postcss-browser-reporter")(),
            require("postcss-reporter")(),
          ]
        }
      }
    }),

    // new CleanPlugin([assetsPath], { root: projectRootPath }),

    // css files from the extract-text-plugin loader
    new ExtractTextPlugin({
      filename: '[name]-[chunkhash].css',
      // disable: false,
      allChunks: true
    }),

    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"production"',
      'process.env.APIHOST': '"api.hometown.in/api/"',
      'process.env.SITE_URL': '"https://www.hometown.in"',
      __CLIENT__: true,
      __SERVER__: false,
      __DEVELOPMENT__: false,
      __DEVTOOLS__: false,
      __DLLS__: false
    }),

    // ignore dev config
    new webpack.IgnorePlugin(/\.\/dev/, /\/config$/),

    // optimizations
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),

    webpackIsomorphicToolsPlugin,

    new ReactLoadablePlugin({
      filename: path.join(`${assetsPath}/${version}`, 'loadable-chunks.json')
    }),

    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'src/pwa.js'
    }),

    /* gzip compression */
    new CompressionPlugin({
      test: /\.js|.css|.scss/
    }),
    /* Bundle analyzer */
    // new BundleAnalyzerPlugin(),

    new SWPrecacheWebpackPlugin({
      cacheId: 'hometown.in',
      filename: '../service-worker.js',
      importScripts: ['https://widgets.in.webengage.com/js/service-worker.js'],
      maximumFileSizeToCacheInBytes: 8388608,

      // Ensure all our static, local assets are cached.
      staticFileGlobs: [
        `${path.join(`${assetsPath}/${version}`)}/**/*.{css,png,jpg,gif,svg,eot,ttf,woff,woff2}`
      ],
      stripPrefix: path.dirname(`${assetsPath}/${version}`),

      directoryIndex: '/',
      verbose: true,
      navigateFallback: `/dist/${version}/index.html`,
    }),
    new S3Plugin({
      // Exclude uploading of html
      exclude: /.*\.gz$/,
      basePath: `dist/${version}`,
      // s3Options are required
      s3Options: {
        accessKeyId: 'AKIAJP6PV377QISMNWSQ',
        secretAccessKey: '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',
        region: 'ap-south-1',
        signatureVersion: 'v4'
      },
      s3UploadOptions: {
        Bucket: 'ht-live',
        CacheControl: 'max-age=31536000',
        Expires: new Date(new Date().getTime() + 31536000000) // expiry for one year
      }
    }),
    new WebpackOnBuildPlugin(function() {
        const data = {
          version,
          date:Date.now()
          }
        const versionPath = path.join(__dirname,'..')
        fs.writeFile(`${versionPath}/version.json`,
          JSON.stringify(data),
          (err) => {
          if (err) throw err;
          console.log(`VERSION RELEASE : ${version}`);
        });
    }),
  ]
};
