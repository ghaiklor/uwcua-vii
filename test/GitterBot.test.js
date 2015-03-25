var assert = require('assert');
var sinon = require('sinon');
var GitterBot = require('../lib/GitterBot');
var DEFAULT_CONFIG = {
  apiKey: 'API_KEY',
  roomName: 'ghaiklor/uwcua-vii',
  execPattern: /^exec\s+/,
  calcPattern: /^calc\s+/,
  pingPattern: /^Ping$/
};

describe('GitterBot', function () {
  it('Should properly exports', function () {
    assert.equal(typeof GitterBot, 'function');
  });

  it('Should properly create instance of GitterBot', function () {
    assert(new GitterBot(DEFAULT_CONFIG) instanceof GitterBot);
  });

  it('Should properly get/set config', function () {
    var bot = new GitterBot(DEFAULT_CONFIG);
    assert.deepEqual(bot.getConfig(), DEFAULT_CONFIG);
    assert.equal(bot.getConfig('apiKey'), DEFAULT_CONFIG.apiKey);

    bot.setConfig({apiKey: 'new-api-key'});
    assert.deepEqual(bot.getConfig(), {
      apiKey: 'new-api-key',
      roomName: 'ghaiklor/uwcua-vii',
      execPattern: /^exec\s+/,
      calcPattern: /^calc\s+/,
      pingPattern: /^Ping$/
    });
  });

  it('Should properly throw exception when API key is not exists', function () {
    assert.throws(function () {
      new GitterBot();
    }, Error);
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
    assert.equal(sendStub.callCount, 1);
    assert(bot._onRoomMessage(room, {text: 'exec 1 + 2'}) instanceof GitterBot);
    assert.equal(sendStub.callCount, 2);
    assert(bot._onRoomMessage(room, {text: 'Ping'}) instanceof GitterBot);
    assert.equal(sendStub.callCount, 3);
  });
});
