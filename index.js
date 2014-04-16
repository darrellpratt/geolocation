'use strict';

function GeoLocation (latitude, longitude) {

  // functions
  this.fromRadians = function(latitude, longitude) {

    var degLat = latitude * 180/Math.PI; // degrees = radians * (180/pi)
    var degLon = longitude * 180/Math.PI; // degrees = radians * (180/pi)

    return [degLon,degLat];
  };

  /** Converts numeric degrees to radians */
  if (typeof Number.prototype.toRad == 'undefined') {
    Number.prototype.toRad = function() {
      return this * Math.PI / 180;
    };
  }

  /** Converts radians to numeric (signed) degrees */
  if (typeof Number.prototype.toDeg == 'undefined') {
    Number.prototype.toDeg = function() {
      return this * 180 / Math.PI;
    };
  }

  this.version = '0.1';
  this.degLon = longitude;
  this.degLat = latitude;
  this.earthRadius = 6371.01;
  this.radLon = this.degLon.toRad();
  this.radLat = this.degLat.toRad();

  this.MIN_LAT = (-90).toRad();  // -PI/2
  this.MAX_LAT = (90).toRad();   //  PI/2
  this.MIN_LON = (-180).toRad(); // -PI
  this.MAX_LON = (180).toRad();

}

/*
 * Return a bounding box in form [minX,minY,maxX,maxY]
 *   x = longitude,  y = lattitude & is lowerleft x,y, upper right x,y
 */
GeoLocation.prototype.boundingBox = function(radKm) {
  console.log('geolocation class');
  console.log(this.degLon);
  console.log(radKm);
  console.log(this.degLat);

  var radDist = radKm / this.earthRadius;
  var minLat = this.radLat - radDist;
  var maxLat = this.radLat + radDist;
  var minLon, maxLon;

  console.log(radDist);

  if (minLat > this.MIN_LAT && maxLat < this.MAX_LAT) {
    var deltaLon = Math.asin(Math.sin(radDist) /
      Math.cos(this.radLat));
    minLon = this.radLon - deltaLon;
    if (minLon < this.MIN_LON) minLon += 2 * Math.PI;
    maxLon = this.radLon + deltaLon;
    if (maxLon > this.MAX_LON) maxLon -= 2 * Math.PI;
  } else {
    // a pole is within the distance
    minLat = Math.max(minLat, this.MIN_LAT);
    maxLat = Math.min(maxLat, this.MAX_LAT);
    minLon = this.MIN_LON;
    maxLon = this.MAX_LON;
  }
  var lowerLeft = this.fromRadians(minLat,minLon);
  var upperRight = this.fromRadians(maxLat,maxLon);

  return [lowerLeft[0],lowerLeft[1],upperRight[0],upperRight[1]].toString();

};



module.exports = GeoLocation;
