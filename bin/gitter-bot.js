var program = require('commander');
var pkg = require('../package.json');
var GitterBot = require('../lib/GitterBot');

program
  .version(pkg.version)
  .description('Gitter bot for evaluating expressions')
  .usage('[options]')
  .option('-k, --key <key>', 'Set API key')
  .option('-r, --room <room>', 'Set room')
  .option('-p, --pattern <pattern>', 'Set execution pattern')
  .parse(process.argv);

var bot = new GitterBot({apiKey: program.key, roomName: program.room, execPattern: program.pattern});
process.on('exit', bot.destroy.bind(bot));
