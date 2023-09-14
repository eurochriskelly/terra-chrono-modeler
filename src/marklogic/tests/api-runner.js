import fs from 'fs';
import { settings } from '../../../dist/config/environment.js';

const ARGS = {
  SAMPLE_ID: 'c4d11a3d0ef50d322ae1b4d402453e3d'
}

const main = () => {
  const {
    mlHostname, mlPort, mlProtocol = 'http',
    username = 'admin', password = 'admin'
  } = settings;
  processArgs()

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
  switch (ARGS.mode) {
    case 'clearData':
      tests = testClearData(apiDetails, auth);
      tests.clearData = true
      break

    case 'insertData':
      tests = testInsertData(apiDetails, auth);
      tests.insertData = true
      break

    case 'modifyData':
      tests = testModifyData(apiDetails, auth);
      tests.modifyData = true
      break

    case 'getters':
      tests = testGetMethods(apiDetails, auth);
      break

    default:
      break
  }

  console.log(JSON.stringify(tests, null, 2));
};

////////////////////////////////////////////////////////////////////////////////
const wrapCollection = (item = []) => {
  return {
    info: {
      _postman_id: 'postman-tests-dgrm-api',
      name: 'DGRM API Tests',
      schema: 'https://schema.getpostman.com/json/collection/v2.1.0/collection.json',
    },
    item: item.filter((item) => !item.disabled),
  }
}

const testInsertData = (apiDetails, auth) => {
  return wrapCollection([
    {
      name: 'Create new features',
      request: {
        method: 'POST',
        header: [
          {
            "key": "Content-Type",
            "value": "application/json"
          }
        ],
        auth,
        body: {
          mode: 'raw',
          raw: [
            {
              "type": "Feature",
              "geometry": {
                "type": "Polygon",
                "coordinates": [
                  [
                    [-20, -40],  // Point 1
                    [60, -40],   // Point 2
                    [60, 0],     // Point 3
                    [40, 20],    // Point 4
                    [30, 40],    // Point 5
                    [0, 40],     // Point 6
                    [-30, 30],   // Point 7
                    [-40, 10],   // Point 8
                    [-40, 0],    // Point 9
                    [-20, -40]   // Point 10 (Closing Point)
                  ]
                ]
              },
              "properties": {
                "name": "Polygon Surrounding Africa 2",
              }
            },
            {
              "type": "Feature",
              "geometry": {
                "type": "Polygon",
                "coordinates": [
                  [
                    [-20, -42],  // Point 1
                    [61, 0],     // Point 3
                    [32, 43],    // Point 5
                    [0, 42],     // Point 6
                    [-41, 9],   // Point 8
                    [-11, 0],    // Point 9
                    [-21, -39]   // Point 10 (Closing Point)
                  ]
                ]
              },
              "properties": {
                "name": "Polygon Surrounding Africa 2",
              }
            }
          ]
        },
        url: {
          ...apiDetails,
          query: [
            { key: 'rs:radius', value: '1000' },
            { key: 'rs:layer', value: 'continent' },
          ],
        }
      },
      response: [],
      event: [
        {
          listen: 'test',
          script: {
            exec: [
              'pm.test("Status code is 201", function () {',
              '    pm.response.to.have.status(201);',
              '});',
            ],
            type: 'text/javascript',
          },
        },
      ],
    },
  ])
}

const testClearData = (apiDetails, auth) => {
  return wrapCollection([
    {
      name: 'Clear data from the database',
      request: {
        method: 'DELETE',
        header: [],
        auth,
        body: {},
        url: apiDetails,
      },
      response: [],
    },
  ])
}

const testGetMethods = (apiDetails, auth) => {
  return wrapCollection([
    {      
      name: 'Request for a radius where we have data',
      request: {
        method: 'GET',
        header: [],
        auth,
        body: {},
        url: {
          ...apiDetails,
          query: [
            { key: 'rs:radius', value: '1000' },
          ]
        },
      },
      response: [],
      event: [
        {
          listen: 'test',
          script: {
            exec: [
              'pm.test("Status code is 200", function () {',
              '    pm.response.to.have.status(200);',
              '});',
              '',
              'pm.test("Response has expected keys", function () {',
              '    var jsonData = pm.response.json();',
              '    pm.expect(jsonData).to.have.length(2);',
              '});',
            ],
            type: 'text/javascript',
          },
        },
      ],
    },
    {
      disabled: true,
      name: 'Request for full documents in response',
      request: {
        method: 'GET',
        header: [],
        auth,
        body: {},
        url: {
          ...apiDetails,
          query: [
            { key: 'rs:radius', value: '1000' },
            { key: 'rs:mode', value: 'full' },
          ]
        },
      },
      response: [],
      event: [
        {
          listen: 'test',
          script: {
            exec: [
              'pm.test("Status code is 200", function () {',
              '    pm.response.to.have.status(200);',
              '});',
              '',
              'pm.test("Response has expected keys", function () {',
              '    var jsonData = pm.response.json();',
              '    pm.expect(jsonData).to.have.length(2);',
              '    pm.expect(jsonData[0].type).to.be.equal("Feature");',
              '});',
            ],
            type: 'text/javascript',
          },
        },
      ],
    },
    {
      disabled: true,
      name: 'Request for a radius where we have no data',
      request: {
        method: 'GET',
        header: [],
        auth,
        body: {},
        url: {
          ...apiDetails,
          query: [
            { key: 'rs:radius', value: '6000' },
          ]
        },
      },
      response: [],
      event: [
        {
          listen: 'test',
          script: {
            exec: [
              'pm.test("Status code is 200", function () {',
              '    pm.response.to.have.status(200);',
              '});',
              '',
              'pm.test("Response has expected keys", function () {',
              '    var jsonData = pm.response.json();',
              '    pm.expect(jsonData).to.have.length(0);',
              '});',
            ],
            type: 'text/javascript',
          },
        },
      ],
    },

  ])
}

const testModifyData = (apiDetails, auth) => {
  return wrapCollection([
    {
      name: 'Create new features',
      request: {
        method: 'PUT',
        header: [
          {
            "key": "Content-Type",
            "value": "application/json"
          }
        ],
        auth,
        body: {
          mode: 'raw',
          raw: {
            "type": "Feature",
            "geometry": {
              "type": "Polygon",
              "coordinates": [
                [
                  [-20, -42],  // Point 1
                  [61, 0],     // Point 3
                  [-21, -39],  // Point 10
                  [-21, -42]   // Point 11 (Closing Point)
                ]
              ]
            },
            "properties": {
              "name": "Polygon Surrounding Africa 2 - modified",
            }
          }
        },
        url: {
          ...apiDetails,
          query: [
            { key: 'rs:id', value: ARGS.SAMPLE_ID },
            { key: 'rs:radius', value: '1000' },
            { key: 'rs:layer', value: 'continent2' },
          ],
        }
      },
      response: [],
    },
  ])
}

////////////////////////////////////////////////////////////////////////////////
const processArgs = () => {
  process.argv.forEach((arg) => {
    const [key, value] = arg.split('=');
    if (key && value) {
      ARGS[key.replace('--', '')] = value;
    }
  })
}

main();
