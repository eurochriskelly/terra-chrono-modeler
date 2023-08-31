import { transformCurvedSurface } from './transform-curved-surface.js';

/**
 * Test by transforming simplfied continent from 6000 to 5500
 * in 100 Ma steps.
 */
describe('transformCurvedSurface', () => {
    it('transforms a surface between two epochs', () => {
        const surface = {
            // todo: create geojson surface object
        }
        const triangles = transformCurvedSurface(surface, 6000, 5900)
        console.log(triangles)
    })
})
