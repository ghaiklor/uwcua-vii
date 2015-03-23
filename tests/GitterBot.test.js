var assert = require('assert');
var GitterBot = require('../lib/GitterBot');
var API_KEY = 'API_KEY';
var ROOM_NAME = 'ghaiklor/uwcua-vii';
var EXEC_PATTERN = /^calc\s*/;

describe('GitterBot', function () {
  it('Should properly exports', function () {
    assert.equal(typeof GitterBot, 'function');
  });

  it('Should properly create instance of GitterBot', function () {
    assert(new GitterBot() instanceof GitterBot);
  });

  it('Should properly get/set API key', function () {
    var bot = new GitterBot({apiKey: API_KEY});
    assert.equal(bot.getApiKey(), API_KEY);

    bot.setApiKey('new-api-key');
    assert.equal(bot.getApiKey(), 'new-api-key');
  });

  it('Should properly get/set room name', function () {
    var bot = new GitterBot({roomName: ROOM_NAME});
    assert.equal(bot.getRoomName(), ROOM_NAME);

    bot.setRoomName('new-room');
    assert.equal(bot.getRoomName(), 'new-room');
  });

  it('Should properly get/set exec pattern', function () {
    var bot = new GitterBot({execPattern: EXEC_PATTERN});
    assert.equal(bot.getExecPattern(), EXEC_PATTERN);

    bot.setExecPattern('^my pattern');
    assert.equal(bot.getExecPattern(), '^my pattern');
  });
});
