const pkg = require('../../package.json')

module.exports = {
  title: `${pkg.name} (${pkg.version})`,
  description: pkg.description,
  dest: `www`,
  plugins: [
    [
      '@vuepress/register-components',
      {
        // componentsDir: `${__dirname}/../../src/components/`
      }
    ],
    'demo-code'
  ]
}