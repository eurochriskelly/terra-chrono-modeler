/*
 * In this class we will store and retrieve data from the MarkLogic server.
 */
import { bus } from './event-bus.js';
import { II } from '../../common/log.js';

class DataSyncPlumbing {
    constructor() {
    }
    static makeOpts(obj) {
        return {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(obj),
            mode: 'cors',
            cache: 'no-cache',
            redirect: 'follow',
            referrerPolicy: 'no-referrer',
        }
    }
    async processDocument(option, obj) {
        const { epoch, layer, data } = obj
        switch (option) {
            case 'store':
                const isoDate = new Date().toISOString().replace(/[\-:TZ]/g, '');
                const uri = `/gegeodesy/epoch/${epoch}/layer/${layer.name}/${isoDate}.json`
                obj.uri = uri
                II('Storing document: ' + obj.uri)
                data.properties.uri = uri
                obj.body = {
                    uri,
                    json: data,
                }
                break

            case 'updateDoc':
                II('Updating document: ' + obj.uri)
                obj.body = {
                    uri: obj.uri,
                    json: data,
                }
                break

            case 'delete':
                II('Deleting document: ' + obj.uri)
                obj.body = {
                    uri: obj.uri,
                }
                break

            default:
                console.error('Unknown option: ', obj.option)
        }
        const ML_URL = `/api/documents`;
        const ML_OPTS = DataSyncPlumbing.makeOpts(obj.body)
        try {
            console.log('--- FETCHING ---')
            console.log(ML_URL)
            console.log(ML_OPTS)
            const response = await fetch(ML_URL, ML_OPTS)
            console.log(response)
        } catch (error) {
            console.error(error)
        }
    }
    async fetch(url, body) {
        try {
            const response = await fetch(url, DataSyncPlumbing.makeOpts(body))
            return await response.json()
        } catch (error) {
            console.error(error)
        }
    }
    async fetchContents(url, body) {
        const results = (await this.fetch(url, body))
        this.raw = results
        return Array.isArray(results.data)
            ? results.data.map(x => x.contents)
            : results.data.contents
    }
}

export class DataSync extends DataSyncPlumbing {
    constructor(username = 'chris.kelly') {
        super()
        this.username = username
        bus.addEventListener('deleteDoc', e => {
            this.deleteData(e.detail.uri)
        })
    }

    async retrieveData() {
        // TODO: Introduce log-in system
        const get = (cmd, args) => this.fetchContents('/api/command', { cmd, args })

        const state = await get('getState', { username: this.username })
        const { epoch } = state

        console.log('state', state)
        // retrieve state data
        const [epochs, backdrops, features] = await Promise.all([
            get('getEpochs', { username: 'chris.kelly' }),
            get('getBackdrops', { username: 'chris.kelly', epoch }),
            get('getFeatures', { epoch })
        ]);

        console.log('backdrops', backdrops)

        state.layers = state.layers.map(x => ({
            ...x,
            color: lookupColor(x, state.layers.indexOf(x))
        }))

        this.result = {
            state,
            epochs,
            backdrops,
            features,
        }
        return this.result
    }

    async syncData(data) {
        const { epochs, backdrops, features, layers } = data
        Object.keys(data).forEach(async key => {
            if (data[key]) {
                await this.save(key, data[key])
            }
        })
    }

    async save(type, list) {
        switch (type) {
            case 'epochs':
                II('Saving epochs...')
                console.log(list)

                break
            case 'layers':
                II('Saving layers...')
                this.result.state.layers = list
                this.processDocument('updateDoc', {
                    uri: `/gegeodesy/user/${this.username}/current-state.json`,
                    data: this.result.state
                })
                break

            default:
                break
        }
    }

    async deleteData(uri) {
        II('Deleting data... ' + uri)
        await this.processDocument('delete', { uri })
    }

    async storeData(epoch, layer, data) {
        II('Storing data...')
        await this.processDocument('store', {
            epoch, layer, data
        })
    }
}


function lookupColor(layer, index) {
    const namedColors = {
        test: '#006600',
        shelf: '#66ff66',
        rift: '#000099',
        riftG: '#000055',
    }
    console.log(`Setting color for layer: [${layer.name}]`)
    if (Object.keys(namedColors).includes(layer.name)) {
        return namedColors[layer.name]
    }
    // Make a random pallette of 10 colors
    const colors = [
        '#ffff00', '#ff00ff', '#00ffff', '#ff8000', '#ff0080',
        '#80ff00', '#0080ff', '#8000ff', '#00ff80', '#ff0080',
        '#ff8000', '#0080ff',
    ]
    return colors[index]
}
