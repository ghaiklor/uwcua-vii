var program = require('commander');
var pkg = require('../package.json');

program
  .version(pkg.version)
  .usage('<room-name>')
  .parse(process.argv);
