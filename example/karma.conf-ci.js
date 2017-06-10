var path = require('path');

module.exports = function(config) {
  var customLaunchers = {
    'SL_Chrome_Latest': {
      base: 'SauceLabs',
      browserName: 'chrome',
      version: '58.0',
      platform: 'Windows 10'
    },
    'SL_Chrome_Latest_Minus_One': {
      base: 'SauceLabs',
      browserName: 'chrome',
      version: '57.0',
      platform: 'Windows 10'
    },
    'SL_Chrome_Latest_Mac': {
      base: 'SauceLabs',
      browserName: 'chrome',
      version: '58.0',
      platform: 'OS X 10.12'
    },
    'SL_Chrome_Latest_Minus_One_Mac': {
      base: 'SauceLabs',
      browserName: 'chrome',
      version: '57.0',
      platform: 'OS X 10.12'
    },
    'SL_Firefox_Latest': {
      base: 'SauceLabs',
      browserName: 'firefox',
      version: '53.0',
      platform: 'Windows 10'
    },
    'SL_Firefox_Latest_Minus_One': {
      base: 'SauceLabs',
      browserName: 'firefox',
      version: '52.0',
      platform: 'Windows 10'
    },
    'SL_Firefox_Latest_Mac': {
      base: 'SauceLabs',
      browserName: 'firefox',
      version: '53.0',
      platform: 'OS X 10.12'
    },
    'SL_Firefox_Latest_Minus_One_Mac': {
      base: 'SauceLabs',
      browserName: 'firefox',
      version: '52.0',
      platform: 'OS X 10.12'
    },
    'SL_Safari': {
      base: 'SauceLabs',
      browserName: 'safari',
      platform: 'OS X 10.12',
      version: '10.0'
    }
  };
  config.set({
    basePath: '',
    frameworks: ['jasmine'],
    files: [
      'test/**/*.js'
    ],
    preprocessors: {
      'src/**/*.js': ['webpack', 'sourcemap'],
      'test/**/*.js': ['webpack', 'sourcemap']
    },
    webpack: {
      devtool: 'inline-source-map',
      module: {
        loaders: [
          {
            test: /\.js$/,
            loader: 'babel-loader',
            exclude: path.resolve(__dirname, 'node_modules')
          },
          {
            test: /\.css$/,
            loader: 'css-loader',
            exclude: path.resolve(__dirname, 'node_modules')
          },
          {
            test: /\.json$/,
            loader: 'json-loader',
            exclude: path.resolve(__dirname, 'node_modules')
          },
        ]
      },
      externals: {
        'react/lib/ExecutionEnvironment': true,
        'react/lib/ReactContext': true
      }
    },
    webpackServer: {
      noInfo: true
    },
    plugins: [
      'karma-webpack',
      'karma-jasmine',
      'karma-sourcemap-loader',
      'karma-chrome-launcher',
      'karma-phantomjs-launcher',
      'karma-sauce-launcher'
    ],
    babelPreprocessor: {
      options: {
        presets: ['airbnb']
      }
    },
    reporters: ['dots', 'saucelabs'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    sauceLabs: {
      testName: 'Fuzzy Matching JS Sauce Labs Browser Testing',
      recordScreenshots: false,
      connectOptions: {
        port: 5757,
        logfile: 'sauce_connect.log'
      },
      public: 'public'
    },
    captureTimeout: 120000,
    customLaunchers: customLaunchers,
    browsers: Object.keys(customLaunchers),
    singleRun: true
  });
};
