module.exports = {
  customSyntax: 'postcss-html',
  extends: [
    'stylelint-config-standard',
    'stylelint-config-standard-vue',
    'stylelint-config-tailwindcss'
  ],
  plugins: ['@namics/stylelint-bem'],
  // add your custom config here
  // https://stylelint.io/user-guide/configure
  rules: {
    'function-no-unknown': null,
    'no-descending-specificity': null,
    'plugin/stylelint-bem-namics': {
      namespaces: [
        // 'ct-',
        // 'layout-',
        // 'page-',
        // 'mapboxgl-'
        //   'nuxt-link-',
        //   'mapboxgl-',
        //   'slick-',
        //   'sv-',
        //   'transition-',
        //   'page-'
      ],
      patternPrefixes: [],
      helperPrefixes: []
    },
    'selector-class-pattern': null,
    'selector-pseudo-class-no-unknown': [
      true,
      {
        ignorePseudoClasses: ['deep']
      }
    ]
  }
}
