const { jestAlias } = require('./build/alias')
console.log(jestAlias())
const moduleNameMapper = jestAlias()
module.exports = {
  preset: '@vue/cli-plugin-unit-jest',
  transform: {
    '^.+\\.vue$': 'vue-jest'
  },
  moduleNameMapper: moduleNameMapper
}
