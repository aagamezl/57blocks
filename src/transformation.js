const { get, pathLength, set } = require('./utils')

/**
 *
 * @param {object} data
 * @param {object} config
 * @param {number} [deepLevel=10]
 * @returns {object}
 */
const transform = (data, config, deepLevel = 10) => {
  if (Object.keys(config).length === 0) {
    return data
  }

  for (const [path, operation] of Object.entries(config)) {
    const length = pathLength(path)
    if (length > deepLevel) {
      throw new Error(`${path} length (${length}) is greater than configurated deep level (${deepLevel})`)
    }

    const value = get(data, path)

    if (value !== undefined) {
      set(data, path, operation(value))
    }
  }

  return data
}

module.exports = {
  transform
}
