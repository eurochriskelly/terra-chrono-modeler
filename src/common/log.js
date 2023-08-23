const _log = (x, rest) => {
    console.log(`${new Date().toISOString()}: ${x} ${rest}`)
}
export const II = msg => _log('II', msg)
export const DD = msg => _log('DD', msg)
export const EE = msg => _log('EE', msg)
export const WW = msg => _log('WW', msg)
