/*
 * Class takes a geo-json object and returns a modified
 * object, on a different sized planet.
 * The area should be very similar (but not identical) regardeless of radius.
 *
 * Output corodinates are defined in long/lat format but represent a very values (although very similar)
 * area on the new planet.
 */

class GravityDrop {
    constructor(geoJSON, sizeInKm = 6371) {
        this.surfaceFeatures = geoJSON;
        this.planetRadius = sizeInKm
    }
    checkArea() {

    }
    get centerOfGravity() {
        // must know how to find a center for flattening

    }
}
