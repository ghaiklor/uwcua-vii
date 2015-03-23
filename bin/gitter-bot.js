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
  .parse(process.argv);

var bot = new GitterBot({
  apiKey: program.key,
  roomName: program.room,
  execPattern: program.execPattern,
  calcPattern: program.calcPattern
});

process.on('exit', bot.destroy.bind(bot));
