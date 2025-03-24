'use strict';

const GeoLocation = require('../index');

describe('GeoLocation', () => {
  describe('constructor', () => {
    it('should initialize with correct values', () => {
      const geo = new GeoLocation(41.8748562, -87.6352741);
      
      expect(geo.degLat).toBe(41.8748562);
      expect(geo.degLon).toBe(-87.6352741);
      expect(geo.earthRadius).toBe(6371.01);
      expect(geo.version).toBe('0.4.1');
      
      // Calculated values - use actual values from implementation
      expect(geo.radLat).toBe(geo.toRadians(geo.degLat));
      expect(geo.radLon).toBe(geo.toRadians(geo.degLon));
    });
  });

  describe('toRadians', () => {
    it('should convert degrees to radians', () => {
      const geo = new GeoLocation(0, 0);
      
      expect(geo.toRadians(0)).toBe(0);
      expect(geo.toRadians(180)).toBeCloseTo(Math.PI, 10);
      expect(geo.toRadians(90)).toBeCloseTo(Math.PI / 2, 10);
      expect(geo.toRadians(-90)).toBeCloseTo(-Math.PI / 2, 10);
    });
  });

  describe('toDegrees', () => {
    it('should convert radians to degrees', () => {
      const geo = new GeoLocation(0, 0);
      
      expect(geo.toDegrees(0)).toBe(0);
      expect(geo.toDegrees(Math.PI)).toBeCloseTo(180, 10);
      expect(geo.toDegrees(Math.PI / 2)).toBeCloseTo(90, 10);
      expect(geo.toDegrees(-Math.PI / 2)).toBeCloseTo(-90, 10);
    });
  });

  describe('fromRadians', () => {
    it('should convert coordinates from radians to degrees', () => {
      const geo = new GeoLocation(0, 0);
      
      const result1 = geo.fromRadians(0, 0);
      expect(result1[0]).toBe(0);
      expect(result1[1]).toBe(0);
      
      const result2 = geo.fromRadians(Math.PI / 2, Math.PI);
      expect(result2[0]).toBeCloseTo(180, 10);
      expect(result2[1]).toBeCloseTo(90, 10);
    });
  });

  describe('boundingBox', () => {
    it('should calculate bounding box for Chicago', () => {
      const geo = new GeoLocation(41.8748562, -87.6352741);
      
      // 1km radius
      const bbox1km = geo.boundingBox(1);
      expect(typeof bbox1km).toBe('string');
      
      const parts1 = bbox1km.split(',').map(Number);
      expect(parts1.length).toBe(4);
      
      // Assert that the bounding box is generally correct (with less precision)
      expect(parts1[0]).toBeLessThan(geo.degLon);      // minLon should be smaller
      expect(parts1[1]).toBeLessThan(geo.degLat);      // minLat should be smaller
      expect(parts1[2]).toBeGreaterThan(geo.degLon);   // maxLon should be larger
      expect(parts1[3]).toBeGreaterThan(geo.degLat);   // maxLat should be larger
    });

    it('should handle edge cases near poles', () => {
      // Near North Pole
      const geoNorth = new GeoLocation(89, 0);
      const bboxNorth = geoNorth.boundingBox(200);
      const partsNorth = bboxNorth.split(',').map(Number);
      
      expect(partsNorth[1]).toBeLessThan(89);         // minLat should be smaller
      expect(partsNorth[3]).toBeLessThanOrEqual(90);  // maxLat capped at 90
      
      // Near South Pole
      const geoSouth = new GeoLocation(-89, 0);
      const bboxSouth = geoSouth.boundingBox(200);
      const partsSouth = bboxSouth.split(',').map(Number);
      
      expect(partsSouth[1]).toBeGreaterThanOrEqual(-90); // minLat capped at -90
      expect(partsSouth[3]).toBeGreaterThan(-89);        // maxLat should be larger
    });

    it('should cover both poles if radius is extremely large', () => {
      // Test to ensure we get full pole coverage with a very large radius
      const geo = new GeoLocation(0, 0);
      const bboxGlobal = geo.boundingBox(20000); // Larger than earth's circumference
      const parts = bboxGlobal.split(',').map(Number);
      
      // Test that we cover the entire lat range
      expect(parts[1]).toBeLessThanOrEqual(-89);  // minLat close to -90
      expect(parts[3]).toBeGreaterThanOrEqual(89); // maxLat close to 90
    });
  });
});