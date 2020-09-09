import { types as sdkTypes } from './util/sdkLoader';

const { LatLng, LatLngBounds } = sdkTypes;

// An array of locations to show in the LocationAutocompleteInput when
// the input is in focus but the user hasn't typed in any search yet.
//
// Each item in the array should be an object with a unique `id` (String) and a
// `predictionPlace` (util.types.place) properties.
export default [
  {
    id: 'default-vancouver',
    predictionPlace: {
      address: 'Vancouver, Canada',
      bounds: new LatLngBounds(new LatLng(49.3166900279816, -123.03932143), new LatLng(49.18886564, -123.24060571)),
    },
  },
  {
    id: 'default-toronto',
    predictionPlace: {
      address: 'Toronto, Canada',
      bounds: new LatLngBounds(new LatLng(43.8554654957061, -79.1134670108977), new LatLng(43.5603428815601, -79.639302406235)),
    },
  },
];
