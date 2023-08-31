import { transformCurvedSurface } from './transform-curved-surface.js';

/**
 * Test by transforming simplfied continent from 6000 to 5500
 * in 100 Ma steps.
 */
describe('transformCurvedSurface', () => {
    it('transforms a surface between two epochs', () => {
        const surface = {
            "type": "Feature",
            "properties": {
                "uri": "/gegeodesy/epoch/e2/layer/test/20230809161959.797.json"
            },
            "geometry": {
                "type": "LineString",
                "coordinates": [
                    [-50.877686, 68.866819],
                    [-50.910645, 68.552092],
                    [-51.454468, 68.297671],
                    [-51.976319, 68.536023],
                    [-52.706909, 68.542573],
                    [-53.393555, 66.029776],
                    [-52.514649, 65.200079],
                    [-51.767579, 64.565393],
                    [-49.965821, 62.376362],
                    [-48.861695, 61.248185],
                    [-47.779542, 60.499854],
                    [-45.329591, 60.241952],
                    [-42.615968, 60.316897],
                    [-41.912843, 62.462236]
                ]
            }
        }
        const triangles = transformCurvedSurface(surface, 6000, 5900)
        console.log(triangles)
    })
})
