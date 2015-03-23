var program = require('commander');
var pkg = require('../package.json');

program
  .version(pkg.version)
  .description('Gitter bot for evaluating expressions')
  .usage('<room-name>')
  .parse(process.argv);

if (!program.args[0]) {
  throw new Error('You must supply room');
}
