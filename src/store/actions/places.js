import { SET_PLACES } from './types';
import { uiStartPlaceUpload, uiStopPlaceUpload } from './index';

const ROOT_URL =  'https://rn-places-1525072607138.firebaseio.com/places.json';

export const addPlace = (placeText, placeLocation, placeImage) => dispatch => {
  dispatch(uiStartPlaceUpload());
  fetch('https://us-central1-rn-places-1525072607138.cloudfunctions.net/storeImage', {
    method: 'POST',
    body: JSON.stringify({
      image: placeImage.data
    })
  })
  .then(res => res.json())
  .then(data => {
    console.log(data);
    return fetch(ROOT_URL, {
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

export const getPlaces = () => dispatch => {
  fetch(ROOT_URL)
    .then(res => res.json())
    .then(data => {
      const places = [];
      for (const key in data) {
        places.push({
          ...data[key],
          image: { uri: data[key].image },
          id: key
        })
      }
      dispatch(setPlaces(places));
    })
    .catch(err => console.log(err));
};

// export const removePlace = placeId => ({
//   type: REMOVE_PLACE,
//   placeId
// });
