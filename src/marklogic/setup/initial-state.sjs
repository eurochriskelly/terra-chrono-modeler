declareUpdate()

const docs = {
    initialState: {
        epoch: 'e1',
        layer: 'test',
        mode: 'flat',
        zoom: 4,
        settings: [
            {
                id: 'm1',
                mode: 'flat',
                position: {
                    zoom: 4,
                    center: [0, 0],
                }
            },
            {
                id: 'm2',
                mode: 'world',
                position: {

                }
            }

        ],
        center: [0, 0],
        layers: [
            {
                id: 'l1',
                name: 'test',
                color: 'red',
                on: true,
            },
            {
                id: 'l2',
                name: 'rift',
                color: 'red',
                on: false
            },
            {
                id: 'l3',
                name: 'empty',
                color: 'green',
                on: true
            },
        ],
        world: {
            SCALE_FACTOR: 0.001,
            RADIUS_EARTH: 6371,
            RADIUS_EPOCH: 3200,
        }
    },
    intialEpochs: [
        { id: 'e1', name: 'present', mya: 0, radius: 6371 },
        { id: 'e2', name: 'early atlantic', mya: 10, radius: 5496 },
        { id: 'e3', name: 'atlantic', mya: 200, radius: 5096 },
        { id: 'e4', name: 'ancient', mya: 250, radius: 4600 },
    ],
    // retrieve backdrop data for the current epoch
    initialBackdrops: [
        {
            id: 'b1',
            name: 'earth',
            epoch: 'e1',
            bounds: [[-90, -180], [90, 180]],
            image: 'images/mercador-square.jpg',
            opacity: 0.9,
            on: true,
        },
        {
            id: 'b2',
            name: 'sea-floor',
            epoch: 'e1',
            bounds: [[-67, -250.5], [76, 101.5]],
            image: 'images/ocean-floor.jpg',
            opacity: 0.1,
            on: true,
        },
        {
            id: 'b3',
            name: 'sa-a-fit',
            epoch: 'e1',
            bounds: [[-67, -250.5], [76, 101.5]],
            image: 'images/southamerica-africa-fit.jpg',
            opacity: 0.1,
            on: true,
        },
    ]
}


Object.keys(docs).forEach((key) => {
    const { documentInsert } = xdmp
    let uri = ''
    switch (key) {
        case 'initialState':
            uri = `/gegeodesy/user/default/current-state.json`
            documentInsert(uri, docs[key])
            break
        case 'intialEpochs':
            docs.intialEpochs.forEach((epoch) => {
                uri = `/gegeodesy/user/default/epoch/${epoch.id}.json`
                documentInsert(uri, epoch)
            })
        case 'initialBackdrop':
            docs.initialBackdrops.forEach((backdrop) => {
                uri = `/gegeodesy/user/default/epoch/${backdrop.epoch}/backdrop/${backdrop.id}.json`
                documentInsert(uri, backdrop)
            })
        default:
            break
    }
})
