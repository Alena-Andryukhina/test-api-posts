const EARTH_RADIUS = 6371137; // meters
const COEFFICIENT_TO_KM = 0.001;

function solveDistance(lon1, lat1, lon2, lat2) {
  const toRadiansCoefficient = Math.PI / 180;
  const dLat = (lat2 - lat1) * toRadiansCoefficient;
  const dLon = (lon2 - lon1) * toRadiansCoefficient;
  const sigma = Math.sin(dLat / 2) * Math.sin(dLat / 2)
    + Math.cos(lat1 * toRadiansCoefficient) * Math.cos(lat2 * toRadiansCoefficient)
    * Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(sigma), Math.sqrt(1 - sigma));
  return EARTH_RADIUS * c * COEFFICIENT_TO_KM;
}

module.exports = solveDistance;
