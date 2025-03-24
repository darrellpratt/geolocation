'use strict';

/**
 * GeoLocation class for calculating bounding boxes
 */
class GeoLocation {
  /**
   * Create a new GeoLocation instance
   * @param {number} latitude - Latitude in degrees
   * @param {number} longitude - Longitude in degrees
   */
  constructor(latitude, longitude) {
    this.version = '0.4.1';
    this.degLon = longitude;
    this.degLat = latitude;
    this.earthRadius = 6371.01;
    this.radLon = this.toRadians(this.degLon);
    this.radLat = this.toRadians(this.degLat);

    this.MIN_LAT = this.toRadians(-90);  // -PI/2
    this.MAX_LAT = this.toRadians(90);   //  PI/2
    this.MIN_LON = this.toRadians(-180); // -PI
    this.MAX_LON = this.toRadians(180);
  }

  /**
   * Convert degrees to radians
   * @param {number} degrees - Angle in degrees
   * @returns {number} Angle in radians
   */
  toRadians(degrees) {
    return degrees * Math.PI / 180;
  }

  /**
   * Convert radians to degrees
   * @param {number} radians - Angle in radians
   * @returns {number} Angle in degrees
   */
  toDegrees(radians) {
    return radians * 180 / Math.PI;
  }

  /**
   * Convert latitude and longitude from radians to degrees
   * @param {number} latitude - Latitude in radians
   * @param {number} longitude - Longitude in radians
   * @returns {Array<number>} [longitude, latitude] in degrees
   */
  fromRadians(latitude, longitude) {
    const degLat = this.toDegrees(latitude);
    const degLon = this.toDegrees(longitude);
    return [degLon, degLat];
  }

  /**
   * Calculate a bounding box around a point with a given radius
   * @param {number} radKm - Radius in kilometers
   * @returns {string} Comma-separated string of [minLon, minLat, maxLon, maxLat]
   */
  boundingBox(radKm) {
    const radDist = radKm / this.earthRadius;
    let minLat = this.radLat - radDist;
    let maxLat = this.radLat + radDist;
    let minLon, maxLon;

    // Test both conditions to ensure branch coverage
    const notAtPole = minLat > this.MIN_LAT && maxLat < this.MAX_LAT;
    
    if (notAtPole) {
      const deltaLon = Math.asin(Math.sin(radDist) / Math.cos(this.radLat));
      minLon = this.radLon - deltaLon;
      if (minLon < this.MIN_LON) {
        minLon += 2 * Math.PI;
      }
      maxLon = this.radLon + deltaLon;
      if (maxLon > this.MAX_LON) {
        maxLon -= 2 * Math.PI;
      }
    } else {
      // a pole is within the distance
      minLat = Math.max(minLat, this.MIN_LAT);
      maxLat = Math.min(maxLat, this.MAX_LAT);
      minLon = this.MIN_LON;
      maxLon = this.MAX_LON;
    }
    
    const lowerLeft = this.fromRadians(minLat, minLon);
    const upperRight = this.fromRadians(maxLat, maxLon);

    return [lowerLeft[0], lowerLeft[1], upperRight[0], upperRight[1]].toString();
  }
}

module.exports = GeoLocation;