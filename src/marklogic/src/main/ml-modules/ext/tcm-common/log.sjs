const _log = (msg, ...args) => {
  console.log(msg, ...args)
}
const _ts = (type) => {
  return `${type} (${new Date().toISOString()})`
}

const II = (msg, ...args) => _log(`${_ts('II')} ${msg}`, ...args)
const DD = (msg, ...args) => _log(`${_ts('DD')} ${msg}`, ...args)
const WW = (msg, ...args) => _log(`${_ts('WW')} ${msg}`, ...args)
const EE = (msg, ...args) => _log(`${_ts('EE')} ${msg}`, ...args)

module.exports = { II, DD, WW, EE }
