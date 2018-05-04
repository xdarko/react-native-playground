import { SET_PLACES, REMOVE_PLACE } from './types';
import { getToken, uiStartPlaceUpload, uiStopPlaceUpload } from './index';

const ROOT_URL =  'https://rn-places-1525072607138.firebaseio.com/places.json';

export const addPlace = (placeText, placeLocation, placeImage) => async (dispatch, getState) => {
  dispatch(uiStartPlaceUpload());
  const token = await dispatch(getToken());
  if (!token) return dispatch(uiStopPlaceUpload());

  fetch('https://us-central1-rn-places-1525072607138.cloudfunctions.net/storeImage', {
    method: 'POST',
    body: JSON.stringify({
      image: placeImage.data
    })
  })
  .then(res => res.json())
  .then(data => {
    console.log(data);
    return fetch(`https://rn-places-1525072607138.firebaseio.com/places.json?auth=${token}`, {
      method: 'POST',
      body: JSON.stringify({
        text: placeText,
        location: placeLocation,
        image: data.imageUrl
      })
    });
  })
  .then(res => res.json())
  .then(data => {
    console.log(data);
    dispatch(uiStopPlaceUpload());
    // dispatch({ type: ADD_PLACE, placeText, placeLocation, placeImage });
  })
  .catch(err => {
    console.log(err);
    dispatch(uiStopPlaceUpload());
  });
};

export const setPlaces = places => ({
  type: SET_PLACES,
  places
});

export const getPlaces = () => async (dispatch, getState) => {
  const token = await dispatch(getToken());
  if (!token) return;

  fetch(`https://rn-places-1525072607138.firebaseio.com/places.json?auth=${token}`)
    .then(res => res.json())
    .then(data => {
      console.log(data);
      const places = [];
      for (const key in data) {
        places.push({
          ...data[key],
          image: { uri: data[key].image },
          id: key
        });
      }
      dispatch(setPlaces(places));
    })
    .catch(err => console.log(err));
};

export const deletePlace = (id) => async (dispatch, getState) => {
  const token = await dispatch(getToken());
  if (!token) return;

  dispatch(removePlace(id));
  fetch(`https://rn-places-1525072607138.firebaseio.com/places/${id}.json?auth=${token}`, {
    method: 'DELETE'
  })
  .catch(err => {
    alert('Something went wrong, sorry :/');
    console.log(err);
  })
  .then(res => res.json())
  .then(() => console.log('Done!'));
};

export const removePlace = id => ({
  type: REMOVE_PLACE,
  id
});
