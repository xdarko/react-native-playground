import { ADD_PLACE, REMOVE_PLACE } from '../actions/types';

const initialState = {
  places: [],
};

const placesReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_PLACE:
      return {
        ...state,
        places: state.places.concat({
          id: Math.random().toString(),
          text: action.placeText,
          image: {
            uri: 'https://images.pexels.com/photos/236047/pexels-photo-236047.jpeg?auto=compress&cs=tinysrgb&h=350'
          }
        })
      };
    case REMOVE_PLACE:
      return {
        ...state,
        places: state.places.filter(place => place.id !== action.placeId),
      };
    default:
      return state;
  }
};

export default placesReducer;
