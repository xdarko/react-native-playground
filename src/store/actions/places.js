import { ADD_PLACE, REMOVE_PLACE } from './types';

export const addPlace = placeText => ({
  type: ADD_PLACE,
  placeText
});

export const removePlace = placeId => ({
  type: REMOVE_PLACE,
  placeId
});
