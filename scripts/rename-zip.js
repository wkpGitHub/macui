const fs = require('fs')
const pkg = require('../package')

const version = pkg.version
try {
  fs.renameSync('dist.zip', `dist_${version}.zip`)
} catch (e) {
  console.error(e)
  process.exit(1)
}
