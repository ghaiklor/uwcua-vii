var assert = require('assert');
var sinon = require('sinon');
var GitterBot = require('../lib/GitterBot');
var DEFAULT_CONFIG = {
  apiKey: 'API_KEY',
  roomName: 'ghaiklor/uwcua-vii',
  execPattern: /^calc\s+/
};

describe('GitterBot', function () {
  it('Should properly exports', function () {
    assert.equal(typeof GitterBot, 'function');
  });

  it('Should properly create instance of GitterBot', function () {
    assert(new GitterBot(DEFAULT_CONFIG) instanceof GitterBot);
  });

  it('Should properly get/set API key', function () {
    var bot = new GitterBot(DEFAULT_CONFIG);
    assert.equal(bot.getApiKey(), DEFAULT_CONFIG.apiKey);

    bot.setApiKey('new-api-key');
    assert.equal(bot.getApiKey(), 'new-api-key');
  });

  it('Should properly throw exception when API key is not exists', function () {
    assert.throws(function () {
      new GitterBot();
    }, Error);
  });

  it('Should properly get/set room name', function () {
    var bot = new GitterBot(DEFAULT_CONFIG);
    assert.equal(bot.getRoomName(), DEFAULT_CONFIG.roomName);

    bot.setRoomName('new-room');
    assert.equal(bot.getRoomName(), 'new-room');
  });

  it('Should properly get/set exec pattern', function () {
    var bot = new GitterBot(DEFAULT_CONFIG);
    assert.equal(bot.getExecPattern(), DEFAULT_CONFIG.execPattern);

    bot.setExecPattern('^my pattern');
    assert.equal(bot.getExecPattern(), '/^my pattern/');

    bot.setExecPattern(/test/);
    assert.equal(bot.getExecPattern(), '/test/');
  });

  it('Should properly start bot', function () {
    var bot = new GitterBot(DEFAULT_CONFIG);
    assert(bot.start() instanceof GitterBot);
  });

  it('Should properly stop bot', function () {
    var bot = new GitterBot(DEFAULT_CONFIG);
    assert(bot.stop() instanceof GitterBot);
  });

  it('Should properly destroy bot', function () {
    var bot = new GitterBot(DEFAULT_CONFIG);
    assert(bot.destroy() instanceof GitterBot);
  });

  it('Should properly call _onJoinRoom', function () {
    var bot = new GitterBot(DEFAULT_CONFIG);
    var listenStub = sinon.stub();
    var onStub = sinon.stub();
    var room = {
      listen: listenStub.returns({on: onStub})
    };

    assert(bot._onJoinRoom(room) instanceof GitterBot);
    assert(listenStub.called);
    assert(onStub.called);
  });

  it('Should properly call _onRoomMessage', function () {
    var bot = new GitterBot(DEFAULT_CONFIG);
    var sendStub = sinon.stub();
    var room = {
      send: sendStub
    };

    assert(bot._onRoomMessage(room, {text: '1 + 2'}) instanceof GitterBot);
    assert(!sendStub.called);
    assert(bot._onRoomMessage(room, {text: 'calc 1 + 2'}) instanceof GitterBot);
    assert(sendStub.called);
  });
});
