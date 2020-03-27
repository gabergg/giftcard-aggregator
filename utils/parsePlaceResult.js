function parsePlaceResult(placeData) {
  const {
    formatted_address: address,
    geometry: {
      location: { lat, lng },
    },
    name,
    place_id: id,
    types: categories,
  } = placeData;

  return { address, categories, id, name, lat, lng };
}

module.exports = parsePlaceResult;
