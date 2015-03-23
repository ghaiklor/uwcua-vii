var vm = require('vm');
var fs = require('fs');
var path = require('path');
var Gitter = require('node-gitter');
var localConfig = fs.existsSync(path.resolve(__dirname, '../config/local.js')) ? require('../config/local.js') : {};

/**
 * Create new instance of GitterBot
 * @param {String} _config Configuration object with `apiKey` and `roomName` properties
 * @constructor
 */
function GitterBot(_config) {
  var config = _config || {};

  this.setApiKey(config.apiKey);
  this.setRoomName(config.roomName);
  this.setExecPattern(config.execPattern);
  this.start();
}

GitterBot.prototype = {
  /**
   * Set API key to GitterBot instance
   * @param {String} key New API key
   * @returns {GitterBot}
   */
  setApiKey: function (key) {
    this._apiKey = key || process.env['GITTER_API_KEY'] || localConfig.apiKey;

    if (!this._apiKey) {
      throw new Error('You must supply API key')
    }

    return this;
  },

  /**
   * Get current API key
   * @returns {String}
   */
  getApiKey: function () {
    return this._apiKey;
  },

  /**
   * Set room to which bot will connect
   * @param {String} roomName Which room you want to listen
   * @returns {GitterBot}
   */
  setRoomName: function (roomName) {
    this._roomName = roomName || process.env['GITTER_ROOM_NAME'] || localConfig.roomName || 'ghaiklor/uwcua-vii';
    return this;
  },

  /**
   * Get current room which bot is listen
   * @returns {String}
   */
  getRoomName: function () {
    return this._roomName;
  },

  /**
   * Set execution pattern
   * @param {String|RegExp} _pattern RegExp pattern
   * @returns {GitterBot}
   */
  setExecPattern: function (_pattern) {
    var pattern = _pattern || process.env['GITTER_BOT_EXEC_PATTERN'] || localConfig.execPattern || /^calc\s+/;
    this._execPattern = pattern instanceof RegExp ? pattern : new RegExp(pattern);
    return this;
  },

  /**
   * Get execution pattern
   * @returns {RegExp}
   */
  getExecPattern: function () {
    return this._execPattern;
  },

  /**
   * Start bot for listening messages
   * @returns {GitterBot}
   */
  start: function () {
    this._gitter = new Gitter(this.getApiKey());
    this._gitter.rooms.join(this.getRoomName()).then(this._onJoinRoom.bind(this));
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
    var pattern = this.getExecPattern();
    var text = message.text;

    if (pattern.test(text)) {
      room.send(vm.runInNewContext(text.replace(pattern, '')));
    }

    return this;
  }
};

module.exports = GitterBot;
