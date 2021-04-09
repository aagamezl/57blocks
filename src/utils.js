/**
 * Gets the value at `path` of `object`.
 *
 * @param {Object} obj
 * @param {string|Array} path
 * @param {*} defaultValue
 *
 * @returns {*} value if exists else undefined
 */
const get = (obj, path, defaultValue) => {
  // If path is not defined or it has false value
  if (!path) {
    return undefined
  }

  // Check if path is string or array. Regex : ensure that we do not have '.' and brackets.
  // Regex explained: https://regex101.com/r/2nQZEZ/1
  const pathArray = Array.isArray(path) ? path : path.match(/([^[.\]])+/g)

  // Find value if exist return otherwise return undefined value;
  return (
    pathArray.reduce((prevObj, key) => prevObj && prevObj[key], obj) || defaultValue
  )
}

/**
 *
 * @param {string} path
 * @returns {number}
 */
const pathLength = (path) => path.match(/([^[.\]])+/g).length

/**
 *
 * @param {*} obj
 * @param {string} path
 * @param {*} value
 * @returns {void}
 */
const set = (obj, path, value) => {
  // Regex explained: https://regex101.com/r/2nQZEZ/1
  const pathArray = Array.isArray(path) ? path : path.match(/([^[.\]])+/g)

  pathArray.reduce((acc, key, index) => {
    if (acc[key] === undefined) {
      acc[key] = {}
    }

    if (index === pathArray.length - 1) {
      acc[key] = value
    }

    return acc[key]
  }, obj)
}

module.exports = {
  get,
  pathLength,
  set
}
