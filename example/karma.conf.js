module.exports = function(config) {
  config.set({
    browsers: ['Chrome'],
    frameworks: ['jasmine'],
    preprocessors: {
      'tests.webpack.js': ['webpack'],
    },
    files: [
      { pattern: 'tests.webpack.js', watched: false },
    ],
    reporters: ['progress'],
    singleRun: true,
    webpack: {
      module: {
        loaders: [
          { test: /\.jsx?$/, exclude: /node_modules/, loader: 'babel-loader' },
        ],
      },
      watch: true,
    },
    webpackServer: {
      noInfo: true,
    },
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    concurrency: Infinity
  })
}
