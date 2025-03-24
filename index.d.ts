/**
 * GeoLocation class for calculating bounding boxes
 */
export default class GeoLocation {
  /**
   * Create a new GeoLocation instance
   * @param latitude - Latitude in degrees
   * @param longitude - Longitude in degrees
   */
  constructor(latitude: number, longitude: number);

  /** Current version of the library */
  version: string;
  
  /** Longitude in degrees */
  degLon: number;
  
  /** Latitude in degrees */
  degLat: number;
  
  /** Earth radius in kilometers */
  earthRadius: number;
  
  /** Longitude in radians */
  radLon: number;
  
  /** Latitude in radians */
  radLat: number;
  
  /** Minimum latitude in radians (-PI/2) */
  MIN_LAT: number;
  
  /** Maximum latitude in radians (PI/2) */
  MAX_LAT: number;
  
  /** Minimum longitude in radians (-PI) */
  MIN_LON: number;
  
  /** Maximum longitude in radians (PI) */
  MAX_LON: number;

  /**
   * Convert degrees to radians
   * @param degrees - Angle in degrees
   * @returns Angle in radians
   */
  toRadians(degrees: number): number;

  /**
   * Convert radians to degrees
   * @param radians - Angle in radians
   * @returns Angle in degrees
   */
  toDegrees(radians: number): number;

  /**
   * Convert latitude and longitude from radians to degrees
   * @param latitude - Latitude in radians
   * @param longitude - Longitude in radians
   * @returns [longitude, latitude] in degrees
   */
  fromRadians(latitude: number, longitude: number): [number, number];

  /**
   * Calculate a bounding box around a point with a given radius
   * @param radKm - Radius in kilometers
   * @returns Comma-separated string of [minLon, minLat, maxLon, maxLat]
   */
  boundingBox(radKm: number): string;
}

// For CommonJS compatibility
export = GeoLocation;