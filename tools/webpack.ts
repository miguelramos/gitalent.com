///<reference path="./typings/webpack.d.ts"/>

import 'ts-helpers';
import { ConfigPack, root } from './config';

const {
  ContextReplacementPlugin,
  DefinePlugin,
  DllPlugin,
  DllReferencePlugin,
  ProgressPlugin,
  NoErrorsPlugin,
  ProvidePlugin
} = require('webpack');

const HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const NamedModulesPlugin = require('webpack/lib/NamedModulesPlugin');
const DashboardPlugin = require('webpack-dashboard/plugin');
const UglifyJsPlugin = require('webpack/lib/optimize/UglifyJsPlugin');
const webpackMerge = require('webpack-merge');

const DEFAULTCONFIG = {
  resolve: {
    extensions: ['.ts', '.js', '.json'],
    mainFields: ['module', 'main', 'browser'],
    modules: [ root('node_modules') ]
  }
};

ConfigPack.defineEnvironment();

const CONSTANTS = {
  AOT: ConfigPack.IS_AOT,
  ENV: JSON.stringify(ConfigPack.ENVIRONMENT),
  // HMR: HMR,
  HOST: JSON.stringify(ConfigPack.HOST),
  PORT: ConfigPack.PORT
};

const COPY_FOLDERS = [
  { from: 'src/assets', to: 'assets' },
  { from: 'node_modules/hammerjs/hammer.min.js' },
  { from: 'node_modules/hammerjs/hammer.min.js.map' },
  ...ConfigPack.COPY_FOLDERS
];

const COMMONCONFIG = function webpackConfig(): WebpackConfig {
  let config: WebpackConfig = Object.assign({});

  config.performance = {
    hints: false
  };

  config.module = {
    rules: [
      {
        test: /\.js$/,
        loader: 'source-map-loader',
        exclude: [ConfigPack.EXCLUDE_SOURCE_MAPS]
      },
      {
        test: /\.ts$/,
        loaders: [
          '@angularclass/hmr-loader',
          'awesome-typescript-loader?{configFileName: "tsconfig.webpack.json"}',
          'angular2-template-loader',
          'angular2-router-loader?loader=system&genDir=src/compile/src/app&aot=' + ConfigPack.IS_AOT
        ],
        exclude: [/\.(spec|e2e|d)\.ts$/]
      },
      { test: /\.json$/, loader: 'json-loader' },
      { test: /\.html/, loader: 'raw-loader', exclude: [root('src/index.html')] },
      { test: /\.css$/, loader: 'raw-loader' },
      {
        test: /\.scss$/,
        use: [
          { loader: "style-loader" },
          { loader: "css-loader" },
          { loader: "sass-loader" }
        ]
      }
    ]
  };

  config.plugins = [
    new ContextReplacementPlugin(
      /angular(\\|\/)core(\\|\/)(esm(\\|\/)src|src)(\\|\/)linker/,
      root('./src')
    ),
    new ProgressPlugin(),
    new DefinePlugin(CONSTANTS),
    new NamedModulesPlugin(),
    new ProvidePlugin({
      jQuery: 'jquery',
      $: 'jquery',
      jquery: 'jquery'
    })
  ];

  if (ConfigPack.IS_DEV_SERVER) {
    COPY_FOLDERS.push({ from: 'build/dll' });

    config.plugins.push(
      new DashboardPlugin(),
      // new WriteFilePlugin(),
      new DllReferencePlugin({
        context: root(''),
        manifest: require('../build/dll/polyfill-manifest.json')
      }),
      new DllReferencePlugin({
        context: root(''),
        manifest: require('../build/dll/vendor-manifest.json')
      }),
      new HtmlWebpackPlugin({
        alwaysWriteToDisk: true,
        inject: false,
        baseHref: '/',
        template: 'src/template.ejs',
        meta: [],
        mobile: true,
        links: [
          {
            href: 'https://fonts.googleapis.com/icon?family=Material+Icons',
            rel: 'stylesheet'
          },
          {
            href: 'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700,400italic',
            rel: 'stylesheet'
          },
          {
            href: '/assets/css/styles.css',
            rel: 'stylesheet'
          }
        ],
        scripts: [
          '/hammer.min.js',
          'https://cdn.polyfill.io/v2/polyfill.min.js?features=console.*,Intl.~locale.en&gated=1',
          '/polyfill.dll.js',
          '/vendor.dll.js'
        ],
        title: 'GITALENT - DEVMODE'
      }),
      new HtmlWebpackHarddiskPlugin()
    );
  }

  if (ConfigPack.IS_DLL) {
    config.plugins.push(
      new DllPlugin({
        name: '[name]',
        path: root('build/dll/[name]-manifest.json'),
        context: root('')
      })
    );
  } else {
    config.plugins.push(
      new CopyWebpackPlugin(COPY_FOLDERS, { ignore: ['*dist/*', '*build/*'] }),
      new CopyWebpackPlugin([{ from: 'src/assets/dist' }])
    );
  }

  if (ConfigPack.IS_PROD) {
    config.plugins.push(
      new NoErrorsPlugin(),
      new UglifyJsPlugin({
        beautify: false,
        comments: false
      }),
      new HtmlWebpackPlugin({
        alwaysWriteToDisk: true,
        inject: false,
        baseHref: '/',
        template: 'src/template.ejs',
        meta: [
          {
            name: 'description',
            content: ''
          },
          {
            name: 'theme-color',
            content: '#ffffff'
          }
        ],
        mobile: true,
        links: [
          {
            href: '/assets/icon/apple-touch-icon.png',
            rel: 'apple-touch-icon',
            sizes: '120x120'
          },
          {
            href: '/assets/icon/favicon-32x32.png',
            rel: 'icon',
            sizes: '32x32',
            type: 'image/png'
          },
          {
            href: '/assets/icon/favicon-16x16.png',
            rel: 'icon',
            sizes: '16x16',
            type: 'image/png'
          },
          {
            href: '/manifest.json',
            rel: 'manifest'
          },
          {
            href: '/assets/icon/safari-pinned-tab.svg',
            rel: 'mask-icon'
          },
          {
            href: 'https://fonts.googleapis.com/icon?family=Material+Icons',
            rel: 'stylesheet'
          },
          {
            href: 'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700,400italic',
            rel: 'stylesheet'
          },
          {
            href: '/assets/css/styles.css',
            rel: 'stylesheet'
          },
          {
            href: '/assets/icon/favicon.ico',
            rel: 'shortcut icon'
          }
        ],
        scripts: [
          '/hammer.min.js',
          'https://cdn.polyfill.io/v2/polyfill.min.js?features=console.*,Intl.~locale.en&gated=1',
        ],
        title: 'GIT YOUR TALENT!',
        embebed: []
      }),
      new CompressionPlugin({
        asset: '[path].gz[query]',
        algorithm: 'gzip',
        test: /\.js$|\.html$/,
        threshold: 10240,
        minRatio: 0.8
      }),
      new HtmlWebpackHarddiskPlugin()
    );
  }

  return config;
} ();

const CLIENTCONFIG = function webpackConfig(): WebpackConfig {
  let config: WebpackConfig = Object.assign({});

  ConfigPack.IS_PROD ? config.devtool = ConfigPack.PROD_SOURCE_MAPS : config.devtool = ConfigPack.DEV_SOURCE_MAPS;

  if (ConfigPack.IS_DLL) {
    config.entry = {
      app_assets: ['./src/main.browser'],
      polyfill: [
        'sockjs-client',
        '@angularclass/hmr',
        'ts-helpers',
        'zone.js',
        'core-js/client/shim.js',
        'core-js/es6/reflect.js',
        'core-js/es7/reflect.js',
        'querystring-es3',
        'strip-ansi',
        'url',
        'punycode',
        'events',
        'webpack-dev-server/client/socket.js',
        'webpack/hot/emitter.js',
        'zone.js/dist/long-stack-trace-zone.js'
      ],
      vendor: [...ConfigPack.VENDOR_DLLS]
    };

    config.output = {
      path: root('build/dll'),
      filename: '[name].dll.js',
      library: '[name]'
    };
  } else {
    config.entry = {
      main: (ConfigPack.IS_AOT ? './src/main.browser.aot' : './src/main.browser')
    };

    config.output = {
      path: root('dist/client'),
      filename: 'index.js'
    };
  }

  config.devServer = {
    contentBase: (ConfigPack.IS_AOT ? './src/compile' : './src'),
    port: CONSTANTS.PORT,
    historyApiFallback: true,
    host: '0.0.0.0',
    quiet: true,
    noInfo: true,
    stats: {
      colors: true
    },
    watchOptions: ConfigPack.DEV_SERVER_WATCH
  };

  if (ConfigPack.USE_DEV_SERVER_PROXY) {
    Object.assign(config.devServer, {
      proxy: ConfigPack.DEV_SERVER_PROXY
    });
  }

  config.node = {
    global: true,
    process: true,
    Buffer: false,
    crypto: true,
    module: false,
    clearImmediate: false,
    setImmediate: false,
    clearTimeout: true,
    setTimeout: true
  };

  config.cache = true;

  return config;
} ();

const WEBPACKMERGE = webpackMerge({}, DEFAULTCONFIG, COMMONCONFIG, CLIENTCONFIG);

module.exports = WEBPACKMERGE;
