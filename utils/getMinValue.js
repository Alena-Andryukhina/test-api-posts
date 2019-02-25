function getMinValue(values) {
  return values.reduce((minVal, item) => (minVal > item ? item : minVal));
}

module.exports = getMinValue;
