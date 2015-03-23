var vm = require('vm');
var Gitter = require('node-gitter');

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
  this.setCalcPattern(config.calcPattern);
  this.start();
}

GitterBot.prototype = {
  /**
   * Set API key to GitterBot instance
   * @param {String} key New API key
   * @returns {GitterBot}
   */
  setApiKey: function (key) {
    this._apiKey = key || process.env['GITTER_API_KEY'];

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
    this._roomName = roomName || process.env['GITTER_ROOM_NAME'] || 'ghaiklor/uwcua-vii';
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
    var pattern = _pattern || process.env['GITTER_BOT_EXEC_PATTERN'] || /^exec\s+/;
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
   * Set calculation pattern
   * @param {String|RegExp} _pattern RegExp pattern
   * @returns {GitterBot}
   */
  setCalcPattern: function (_pattern) {
    var pattern = _pattern || process.env['GITTER_BOT_CALC_PATTERN'] || /^calc\s+/;
    this._calcPattern = pattern instanceof RegExp ? pattern : new RegExp(pattern);
    return this;
  },

  /**
   * Get calculation pattern
   * @returns {String|RegExp}
   */
  getCalcPattern: function () {
    return this._calcPattern;
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
    var execPattern = this.getExecPattern();
    var calcPattern = this.getCalcPattern();
    var text = message.text;

    if (execPattern.test(text)) {
      room.send(vm.runInNewContext(text.replace(execPattern, ''), {}));
    } else if (calcPattern.test(text)) {
      room.send([text.replace(calcPattern, ''), ' = ', vm.runInNewContext(text.replace(calcPattern, ''), {})].join(''));
    } else if (/^Ping Bot!$/.test(message.text)) {
      room.send('Behold the vitality of this bot :smiley:');
    }

    return this;
  }
};

module.exports = GitterBot;
