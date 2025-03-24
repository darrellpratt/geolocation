# bbox-calc

Bounding box calculation based on lat,lon and distance using the Haversine formula.

[![Known Vulnerabilities](https://snyk.io/test/npm/geolocation/badge.svg)](https://snyk.io/test/npm/geolocation)

## Installation

```bash
npm install bbox-calc --save
# or
yarn add bbox-calc
```

## Usage

```javascript
// CommonJS
const GeoLocation = require('bbox-calc');

// Create a new GeoLocation instance with latitude and longitude
const geo = new GeoLocation(41.8748562, -87.6352741);

// Calculate bounding box with radius in kilometers
const bbox = geo.boundingBox(10); // 10km radius

// bbox is a comma-separated string: minLon,minLat,maxLon,maxLat
console.log(bbox); // "-87.77880064758883,41.785142836438945,-87.49174755241117,41.96456956356105"
```

## TypeScript Support

This package includes TypeScript typings.

```typescript
import GeoLocation from 'bbox-calc';

const geo = new GeoLocation(41.8748562, -87.6352741);
const bbox: string = geo.boundingBox(10);
```

## API

### `new GeoLocation(latitude, longitude)`

Creates a new GeoLocation instance.

- `latitude`: Latitude in degrees
- `longitude`: Longitude in degrees

### `boundingBox(radiusInKm)`

Calculates a bounding box around the point with the given radius.

- `radiusInKm`: Radius in kilometers
- Returns: A comma-separated string of `[minLon, minLat, maxLon, maxLat]`

## License

ISC

## Credits

[Darrell Pratt](https://github.com/darrellpratt/)