const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const pkg = require('./package.json');

let settings = {
  version: pkg.version,
  nodeEnv: 'development',
  appEnv: process.env.APP_ENV || 'development',
  uglify: false,
};

if (settings.appEnv === 'production') {
  console.log(`\nBuilding bundle v${settings.version}\n`);

  // overrides certain settings in production
  Object.assign(settings, {
    nodeEnv: 'production',
    uglify: true,
  });
}

const extractGlobalCSS = new ExtractTextPlugin({ filename: `global.v${settings.version}.css`, disable: false, allChunks: true });
const extractCSS = new ExtractTextPlugin({ filename: `main.v${settings.version}.css`, disable: false, allChunks: true });

const options = {
  devtool: 'eval',
  entry: {
    main: path.resolve(__dirname, 'src/main.js'),
    vendor: [
      'object-state-storage',
      'react-css-modules',
      'react-dom',
      'components-di',
      'react',
      'session-controller',
    ],
    polyfills: path.resolve(__dirname, 'src/polyfills.js'),
  },
  output: {
    path: path.resolve(__dirname, 'build', 'assets'),
    // `[name].v${settings.version}.js`, version is separated by "v" prefix, it's easier to read filename that way
    filename: `[name].v${settings.version}.js`,
    publicPath: '/assets/',
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        include: [
          path.resolve(__dirname, 'src'),
          path.resolve(__dirname, 'node_modules', 'object-state-storage'),
          path.resolve(__dirname, 'node_modules', 'session-controller'),
          path.resolve(__dirname, 'node_modules', 'components-di'),
        ],
        loader: 'babel-loader',
      },
      {
        test: /global\.css$/,
        use: extractGlobalCSS.extract({
          fallback: 'style-loader',
          use: 'css-loader?modules&importLoaders=1&localIdentName=[local]!postcss-loader',
        }),
      },
      {
        test: /\.css$/,
        exclude: [/global\.css$/],
        use: extractCSS.extract({
          fallback: 'style-loader',
          use: 'css-loader?modules&importLoaders=1&localIdentName=[local]__[hash:base64:5]!postcss-loader',
        }),
      },
      {
        test: /\.(jpe?g|png|gif)$/i,
        use: [
          'file-loader?hash=sha512&digest=hex&name=[hash].[ext]',
        ],
      },
      {
        test: /\.(svg)$/i,
        use: [
          'file-loader?name=[name].[ext]',
        ],
      },
    ],
  },
  plugins: [
    extractGlobalCSS,
    extractCSS,
    // explicit vendor chunks
    new webpack.optimize.CommonsChunkPlugin({
      names: ['vendor', 'polyfills'],
      filename: `[name].v${settings.version}.js`,
      minChunks: Infinity,
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(settings.nodeEnv),
        APP_ENV: JSON.stringify(settings.appEnv),
        VERSION: JSON.stringify(settings.version),
      },
    }),
  ],
  watchOptions: {
    aggregateTimeout: 100,
  },
};

if (settings.uglify) {
  options.devtool = false;
  options.plugins.push(new webpack.LoaderOptionsPlugin({
    minimize: true,
    debug: false,
  }));
  options.plugins.push(new webpack.optimize.UglifyJsPlugin({
    sourceMap: options.devtool && (options.devtool.indexOf('sourcemap') >= 0 || options.devtool.indexOf('source-map') >= 0),
    beautify: false,
    comments: false,
    mangle: {
      screw_ie8: true,
      keep_fnames: true,
    },
    compress: {
      screw_ie8: true,
      warnings: false,
      drop_console: false,
    },
  }));
}

module.exports = options;
