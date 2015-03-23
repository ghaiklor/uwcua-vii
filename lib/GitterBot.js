var Gitter = require('node-gitter');

/**
 * Create new instance of GitterBot
 * @param {String} _config Configuration object with `key` and `room` properties
 * @constructor
 */
function GitterBot(_config) {
  var config = _config || {};

  this.setKey(config.key);
  this.setRoom(config.room);
  this.start();
}

GitterBot.prototype = {
  /**
   * Set API key to GitterBot instance
   * @param {String} key New API key
   * @returns {GitterBot}
   */
  setKey: function (key) {
    this._key = key || process.env['GITTER_API_KEY'];
    return this;
  },

  /**
   * Get current API key
   * @returns {String}
   */
  getKey: function () {
    return this._key;
  },

  /**
   * Set room to which bot will connect
   * @param {String} room Which room you want to listen
   * @returns {GitterBot}
   */
  setRoom: function (room) {
    this._room = room || process.env['GITTER_ROOM'] || 'ghaiklor/uwcua-vii';
    return this;
  },

  /**
   * Get current room which bot is listen
   * @returns {String}
   */
  getRoom: function () {
    return this._room;
  },

  /**
   * Start bot for listening messages
   * @returns {GitterBot}
   */
  start: function () {
    this._gitter = new Gitter(this.getKey());
    this._gitter.rooms.join(this.getRoom()).then(function (room) {
      var events = room.listen();

      room.send("Hey, I've start listening this room");
      events.on('message', function (message) {
        if (/^calc /.test(message)) {
          // TODO: implement eval
          console.log(message.replace(/^calc /, ''));
        }
      });
    });

    return this;
  },

  /**
   * Stop bot for listening messages
   * @returns {GitterBot}
   */
  stop: function () {
    // TODO: implement this
    return this;
  },

  /**
   * Call when need to destroy current instance
   * @returns {GitterBot}
   */
  destroy: function () {
    this._gitter = null;
    return this;
  }
};

module.exports = GitterBot;
