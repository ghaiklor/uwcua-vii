#!/usr/bin/env node

var program = require('commander');
var pkg = require('../package.json');
var GitterBot = require('../lib/GitterBot');

program
  .version(pkg.version)
  .description('Gitter bot for evaluating expressions')
  .usage('[options]')
  .option('-k, --key <key>', 'Set API key')
  .option('-r, --room <room>', 'Set room')
  .option('-e, --exec-pattern <exec-pattern>', 'Set execution pattern')
  .option('-c, --calc-pattern <calc-pattern>', 'Set calculation pattern')
  .option('-p, --ping-pattern <ping-pattern>', 'Set ping pattern')
  .parse(process.argv);

var bot = new GitterBot({
  apiKey: program.key || process.env['GITTER_API_KEY'],
  roomName: program.room || process.env['GITTER_ROOM_NAME'] || 'ghaiklor/uwcua-vii',
  execPattern: program.execPattern || process.env['GITTER_BOT_EXEC_PATTERN'] || /^exec\s+/,
  calcPattern: program.calcPattern || process.env['GITTER_BOT_CALC_PATTERN'] || /^calc\s+/,
  pingPattern: program.pingPattern || process.env['GITTER_BOT_PING_PATTERN'] || /^Ping$/
});

process.on('exit', bot.destroy.bind(bot));
