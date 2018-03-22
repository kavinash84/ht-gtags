module.exports = {
  use: [
    'postcss-import',
    'postcss-url',
    'postcss-cssnext',
    'postcss-browser-reporter',
    'postcss-reporter'
  ],
  plugins: [
    require('autoprefixer')({ browsers: ['last 5 versions'] }),
    require('lost')
  ]
};
