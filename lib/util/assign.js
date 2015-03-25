/**
 * Assign one object to another
 * @param {Object} target Target object
 * @param {Object} source Source object
 */
module.exports = function assign(target, source) {
  var keys = Object.keys(source);

  for (var i = 0; i < keys.length; i++) {
    target[keys[i]] = source[keys[i]];
  }

  return target;
};
