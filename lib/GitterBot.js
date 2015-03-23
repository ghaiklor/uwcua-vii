var Gitter = require('node-gitter');

/**
 * Create new instance of GitterBot
 * @param {String} config Configuration object with `apiKey` and `room` properties
 * @constructor
 */
function GitterBot(config) {
  config = config || {};

  this.setApiKey(config.apiKey);
  this.setRoom(config.room);
  this.connect();
}

GitterBot.prototype = {
  /**
   * Set API key to GitterBot instance
   * @param {String} key New API key
   * @returns {GitterBot}
   */
  setApiKey: function (key) {
    this._apiKey = key || process.env['GITTER_API_KEY'];
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
   * @param {String} room Which room you want to listen
   * @returns {GitterBot}
   */
  setRoom: function (room) {
    this._room = room || 'ghaiklor/uwcua-vii';
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
   * Update gitter client
   * @returns {GitterBot}
   */
  connect: function () {
    this._gitter = new Gitter(this.getApiKey());
    return this;
  },

  /**
   * Start bot for listening messages
   * @returns {GitterBot}
   */
  start: function () {
    this._gitter.rooms.join(this.getRoom()).then(function (room) {
      var events = room.listen();

      room.send("Hey, I've start listening this room");
      events.on('message', function (message) {
        if (/^calc /.test(message)) {
          // TODO: implement eval
          console.log(message);
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
  }
};

module.exports = GitterBot;
