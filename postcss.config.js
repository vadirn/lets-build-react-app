module.exports = {
  // To be used in webpack
  plugins: [
    require('postcss-smart-import')({}),
    require('postcss-custom-media')({}),
    require('postcss-custom-properties')({}),
    require('postcss-calc')({}),
    require('postcss-color-function')({}),
    require('postcss-discard-comments')({}),
    require('autoprefixer')({
      browsers: ['last 2 versions', 'Chrome >= 13'],
    }),
  ],
};
