import fs from 'fs';
import { settings } from '../../../../../../dist/config/environment.js';
import { processArgs } from '../../lib/helper.js'
import clearData from './test/delete.js'
import insertData from './test/post.js'
import modifyData from './test/put.js'
import getData from './test/get.js'

const ARGS = {
  SAMPLE_ID: 'c4d11a3d0ef50d322ae1b4d402453e3d'
}

const main = () => {
  const {
    mlHostname, mlPort, mlProtocol = 'http',
    username = 'admin', password = 'admin'
  } = settings;
  processArgs(ARGS)

  const apiDetails = {
    protocol: mlProtocol,
    host: [mlHostname],
    port: mlPort,
    path: ['LATEST', 'resources', 'features'],
  }
  const auth = {
    type: 'digest',
    digest: { username, password },
  }

  //
  let tests = ''
  const { mode } = ARGS
  tests = eval(`${mode}Data(apiDetails, auth)`)

  console.log(JSON.stringify(tests, null, 2));
};

main();
