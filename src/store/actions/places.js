import { ADD_PLACE, REMOVE_PLACE } from './types';

export const addPlace = (placeText, placeLocation) => ({
  type: ADD_PLACE,
  placeText,
  placeLocation
});

export const removePlace = placeId => ({
  type: REMOVE_PLACE,
  placeId
});
