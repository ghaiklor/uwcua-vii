var program = require('commander');
var pkg = require('../package.json');
var GitterBot = require('../lib/GitterBot');

program
  .version(pkg.version)
  .description('Gitter bot for evaluating expressions')
  .usage('[options]')
  .option('-k, --key <key>', 'Override default API key')
  .option('-r, --room <room>', 'Override default room')
  .parse(process.argv);

var bot = new GitterBot({key: program.key, room: program.room});
process.on('exit', bot.destroy.bind(bot));
