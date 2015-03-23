var assert = require('assert');
var GitterBot = require('../lib/GitterBot');
var API_KEY = 'API_KEY';

describe('GitterBot', function () {
  it('Should properly exports', function () {
    assert.equal(typeof GitterBot, 'function');
  });

  it('Should properly create instance of GitterBot', function () {
    assert(new GitterBot() instanceof GitterBot);
  });

  it('Should properly create GitterBot with API Key', function () {
    var bot = new GitterBot(API_KEY);

    assert.equal(bot.getApiKey(), API_KEY);
  });

  it('Should properly start gitter bot for listening', function () {
    var bot = new GitterBot(API_KEY);

    assert(!bot._isStarted);
    assert(bot.start() instanceof GitterBot);
    assert(bot._isStarted);
  });

  it('Should properly stop gitter bot for listening', function () {
    var bot = new GitterBot(API_KEY);

    assert(bot._isStarted);
    assert(bot.stop() instanceof GitterBot);
    assert(!bot._isStarted);
  });

  it('Should properly reconnect', function () {
    var bot = new GitterBot(API_KEY);
    assert(bot.reconnect() instanceof GitterBot);
  });
});
