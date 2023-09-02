import { transformCurvedSurface } from './geom/transform-curved-surface.js'
import { transformBoundary } from './geom/transform-boundary.js'

const surface = {
    "type": "Feature",
    "properties": {
        "uri": "/gegeodesy/epoch/e2/layer/test/20230809161959.797.json",
        "radius": 6000
    },
    "geometry": {
        "type": "Polygon",
        "coordinates": [[
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
            [-41.912843, 62.462236],
            [-50.877686, 68.866819],
        ]]
    }
}

const test = 2

switch (test) {
    case 1:
        {
            const triangles = transformCurvedSurface(surface, 6000, 5900)
            console.log(triangles.area)
            console.log(triangles.data.slice(0, 10))
        }
        break
    case 2:
        {
            const results = []
            const startAt = 6000
            for (let mya = 6000; mya > 4000; mya -= 1) {
                const result = transformBoundary(surface, startAt, mya)
                result.mya = mya
                results.push(result)
            }
            console.log(JSON.stringify(results).length/1000)
        }
        break
    default: break
}
