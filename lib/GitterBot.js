var vm = require('vm');
var Gitter = require('node-gitter');
var assign = require('./util/assign');

/**
 * Create new instance of GitterBot
 * @param {String} config Configuration object
 * @constructor
 */
function GitterBot(config) {
  if (!config.apiKey) {
    throw new Error('You must supply API key');
  }

  this.setConfig(config);
  this.start();
}

GitterBot.prototype = {
  /**
   * Set configuration object
   * @param {Object} config Configuration object
   * @returns {GitterBot}
   */
  setConfig: function (config) {
    this._config = config;
    return this;
  },

  /**
   * Get configuration value by key or whole configuration object
   * @param {String} [key] Key for object
   * @returns {*}
   */
  getConfig: function (key) {
    if (key) {
      return this._config[key];
    } else {
      return this._config;
    }
  },

  /**
   * Start bot for listening messages
   * @returns {GitterBot}
   */
  start: function () {
    this._gitter = new Gitter(this.getConfig('apiKey'));
    this._gitter.rooms.join(this.getConfig('roomName')).then(this._onJoinRoom.bind(this));
    return this;
  },

  /**
   * Stop bot for listening messages
   * @returns {GitterBot}
   */
  stop: function () {
    this._gitter = null;
    return this;
  },

  /**
   * Call when need to destroy current instance
   * @returns {GitterBot}
   */
  destroy: function () {
    this.stop();
    return this;
  },

  /**
   * Triggers when bot is joined the room
   * @param {Object} room Room object from node-gitter
   * @returns {GitterBot}
   * @private
   */
  _onJoinRoom: function (room) {
    room.listen().on('message', this._onRoomMessage.bind(this, room));
    return this;
  },

  /**
   * Triggers when bot is getting message
   * @param {Object} room Room object where message posted
   * @param {Object} message Message object from room
   * @returns {GitterBot}
   * @private
   */
  _onRoomMessage: function (room, message) {
    var config = this.getConfig();
    var execPattern = config.execPattern;
    var calcPattern = config.calcPattern;
    var pingPattern = config.pingPattern;
    var text = message.text;

    if (execPattern.test(text)) {
      room.send(vm.runInNewContext(text.replace(execPattern, '')));
    } else if (calcPattern.test(text)) {
      room.send([text.replace(calcPattern, ''), ' = ', vm.runInNewContext(text.replace(calcPattern, ''))].join(''));
    } else if (pingPattern.test(message.text)) {
      room.send('Behold the vitality of this bot :smiley:');
    }

    return this;
  }
};

module.exports = GitterBot;
