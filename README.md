# bbox-calc

Bounding box calculation based on lat,lon and distance.  Using Haversine formula

[![Known Vulnerabilities](https://snyk.io/test/npm/bebox-calc/badge.svg)](https://snyk.io/test/npm/bebox-calc)


## Installation

```
npm install bbox-calc --save
```

## Usage
```
var geo = new GeoLocation(41.8748562,-87.6352741);
var bbox = geo.boundingBox(radiusInKm);
```

## Credits
[Darrell Pratt](https://github.com/darrellpratt/)
