import { run } from '../../lib/helper.js'
import clearData from './test/delete.js'
import insertData from './test/post.js'
import modifyData from './test/put.js'
import getData from './test/get.js'

const ARGS = {
  SAMPLE_ID: 'c4d11a3d0ef50d322ae1b4d402453e3d'
}

run(ARGS, clearData, insertData, modifyData, getData);
