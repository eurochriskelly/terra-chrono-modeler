import { run } from '../../lib/helper.js'
import clearData from './test/delete.js'
import insertData from './test/post.js'
import modifyData from './test/put.js'
import getData from './test/get.js'

const ARGS = {
  SAMPLE_ID: '6f5301f50f2000dfcca79336908cad04',
}

run(ARGS, clearData, insertData, modifyData, getData);
