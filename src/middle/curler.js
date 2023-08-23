import { execSync } from 'child_process'

const _runCurl = async (cmd) => {
    console.log(`COMMAND: ${cmd}`)
    return await execSync(cmd).toString()
}

export const httpPut = async (url, data) => {
    /*
    curl -u admin:admin --digest -H "Content-Type: application/json" -X PUT -d @your_file.json http://localhost:8000/v1/documents?uri=foo.json
    */
    const cmd = [
        `curl -u admin:admin --digest`,
        `-H "Content-Type: application/json"`,
        '-X PUT',
        `-d '${JSON.stringify(data)}'`,
        url
    ].join(' ')
    return await _runCurl(cmd)
}

export const httpDelete = async (url) => {
    const cmd = [
        `curl -u admin:admin --digest`,
        `-H "Content-Type: application/json"`,
        '-X DELETE',
        url
    ].join(' ')
    return _runCurl(cmd)
}

export const httpGet = async (url) => {
    const cmd = [
        `curl -u admin:admin --digest`,
        `-H "Content-Type: application/json"`,
        '-X GET',
        url
    ].join(' ')

    console.log(`COMMAND: ${cmd}`)
    return _runCurl(cmd)
}

export const httpEval = async (
    baseurl,
    command,
    args
) => {
    const scrpath = `./src/marklogic/gegeodesy/${command}.sjs`
    // const script = readFileSync(scrpath, 'utf8').replace('\n', '')
    const url = `${baseurl}/v1/eval`
    const TIMESTAMP = new Date().toISOString().replace(/[\-:TZ]/g, '');
    // convert stringified args to a base64 string
    const sargs = JSON.stringify(args)
    // console.log('sargs', sargs)
    const bargs = Buffer.from(sargs).toString('base64')
    const cmd = [
        `curl -u admin:admin --digest`,
        '-X POST',
        '-H "Content-type: application/x-www-form-urlencoded"',
        `-H "Accept: multipart/mixed; boundary=${TIMESTAMP}"`,
        '--data-urlencode', `javascript@${scrpath}`,
        '--data-urlencode', `vars={\\"ARGS\\":\\"${bargs}\\"}`,
        url
    ].join(' ')
    let result = await _runCurl(cmd)
    result = result.split(TIMESTAMP)[1].split('\n')
        .filter(line => {
            if (line.startsWith('--')) return false
            if (line.startsWith('Content')) return false
            if (line.startsWith('X-Prim')) return false
            if (!line.trim()) return false
            return true
        })
        .map(x => x.trim())
        .join('\n')
    return result
}
