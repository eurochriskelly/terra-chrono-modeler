import { settings } from '../../../../../dist/config/environment.js';

export const run = async (
  ARGS,
  clearData, insertData, modifyData, getData
) => {
  const {
    mlHostname, mlPort, mlProtocol = 'http',
    username = 'admin', password = 'admin'
  } = settings;
  processArgs(ARGS)
  const { mode, api } = ARGS
  const apiDetails = {
    protocol: mlProtocol,
    host: [mlHostname],
    port: mlPort,
    path: ['LATEST', 'resources', api],
  }
  const auth = {
    type: 'digest',
    digest: { username, password },
  }

  //
  const postmanCol = eval(`${mode}Data(apiDetails, auth, ARGS)`)
  console.log(JSON.stringify(postmanCol, null, 2));
}

export const wrapCollection = (item = []) => {
  return {
    info: {
      _postman_id: 'postman-tests-dgrm-api',
      name: 'DGRM API Tests',
      schema: 'https://schema.getpostman.com/json/collection/v2.1.0/collection.json',
    },
    item: item.filter((item) => !item.disabled),
  }
}

export const processArgs = (ARGS) => {
  process.argv.forEach((arg) => {
    const [key, value] = arg.split('=');
    if (key && value) {
      ARGS[key.replace('--', '')] = value;
    }
  })
}
