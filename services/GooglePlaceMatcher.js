const GoogleClient = require('@googlemaps/google-maps-services-js').Client;
const { GOOGLE_API_KEY } = require('../secrets');
const parsePlaceResult = require('../utils/parsePlaceResult');

class PlaceMatcher {
  constructor() {
    this.googleClient = new GoogleClient({});
  }

  async getPlaceId({ address = '', name = '', language = 'en', lat, lng }) {
    try {
      const res = await this.googleClient.findPlaceFromText({
        params: {
          input: `${name} ${address}`,
          inputtype: 'textquery',
          language,
          fields: 'types,formatted_address,geometry,name,place_id',
          key: GOOGLE_API_KEY,
          // ...(lat && lng && { locationbias: `circle:1600@${lat},${lng}` }),
        },
      });
      console.log(res);
      const {
        data: { candidates },
      } = res;

      if (candidates.length === 0) return null;
      return parsePlaceResult(candidates[0]);
    } catch (e) {
      console.error('Failed to fetch place', e);
      return null;
    }
  }
}

module.exports = new PlaceMatcher();
