module.exports = {
  plugins: {
    'tailwindcss/nesting': {},
    tailwindcss: {},
    autoprefixer: {},
    'postcss-import': {}
  }
  // plugins: [
  //   require('tailwindcss'),
  //   require('autoprefixer'),
  //   require('tailwindcss/nesting')(require('postcss-nesting'))
  //   // 'tailwindcss/nesting': {},
  //   // tailwindcss: {},
  //   // autoprefixer: {},
  //   // 'postcss-import': {}
  // ]
}
