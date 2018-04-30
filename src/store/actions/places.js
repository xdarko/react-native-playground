import { ADD_PLACE, REMOVE_PLACE } from './types';

export const addPlace = (placeText, placeLocation, placeImage) => ({
  type: ADD_PLACE,
  placeText,
  placeLocation,
  placeImage
});

export const removePlace = placeId => ({
  type: REMOVE_PLACE,
  placeId
});
