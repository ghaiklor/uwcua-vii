var program = require('commander');
var pkg = require('../package.json');

program
  .version(pkg.version)
  .description('Gitter bot for evaluating expressions')
  .usage('[options] <room-name>')
  .option('-k, --key', 'Override API key by default')
  .parse(process.argv);
