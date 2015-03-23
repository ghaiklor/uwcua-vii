var Gitter = require('node-gitter');

/**
 * Create new instance of GitterBot
 * @param {String} key Your API key
 * @constructor
 */
function GitterBot(key) {
  this.setApiKey(key);
}

GitterBot.prototype = {
  /**
   * Set API key to GitterBot instance
   * @param {String} key New API key
   * @returns {GitterBot}
   */
  setApiKey: function (key) {
    this._apiKey = key;
    return this;
  },

  /**
   * Get current API key
   * @returns {String}
   */
  getApiKey: function () {
    return this._apiKey;
  }
};

module.exports = GitterBot;
