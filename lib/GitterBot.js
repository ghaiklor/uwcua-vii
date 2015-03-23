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
    this._roomName = roomName || process.env['GITTER_ROOM'] || localConfig.roomName || 'ghaiklor/uwcua-vii';
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
   * Start bot for listening messages
   * @returns {GitterBot}
   */
  start: function () {
    this._gitter = new Gitter(this.getApiKey());
    this._gitter.rooms.join(this.getRoomName()).then(function (room) {
      this._gitterRoom = room;
      this._gitterEvents = this._gitterRoom.subscribe();

      this._gitterEvents.on('chatMessages', function (message) {
        // TODO: implement eval
        console.log(message);
      });

      this._gitterRoom.send("Hey, I've start listening this room");
    }.bind(this));

    return this;
  },

  /**
   * Stop bot for listening messages
   * @returns {GitterBot}
   */
  stop: function () {
    this._gitterRoom.unsubscribe();
    return this;
  },

  /**
   * Call when need to destroy current instance
   * @returns {GitterBot}
   */
  destroy: function () {
    this.stop();
    this._gitter = null;
    return this;
  }
};

module.exports = GitterBot;
