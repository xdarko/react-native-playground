import { SET_PLACES, REMOVE_PLACE } from '../actions/types';

const initialState = {
  places: [],
};

const placesReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_PLACES:
      return { ...state, places: action.places };
    case REMOVE_PLACE:
      return {
        ...state,
        places: state.places.filter(place => place.id !== action.id),
      };
    default:
      return state;
    // case ADD_PLACE:
    //   return {
    //     ...state,
    //     places: state.places.concat({
    //       id: Math.random().toString(),
    //       text: action.placeText,
    //       location: action.placeLocation,
    //       image: { uri: action.placeImage.uri }
    //     })
    //   };
  }
};

export default placesReducer;
