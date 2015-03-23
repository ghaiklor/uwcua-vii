var Gitter = require('node-gitter');
var fs = require('fs');
var config = fs.existsSync('../config/local.js') ? require('../config/local.js') : {};

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
    this._apiKey = key || process.env['GITTER_API_KEY'];
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
