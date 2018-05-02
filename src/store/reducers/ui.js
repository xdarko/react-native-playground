import { UI_START_PLACE_UPLOAD, UI_STOP_PLACE_UPLOAD } from '../actions/types';

const initialState = {
  isPlaceUploading: false
};

const uiReducer = (state = initialState, action) => {
  switch(action.type) {
    case UI_START_PLACE_UPLOAD:
      return { ...state, isPlaceUploading: true };
    case UI_STOP_PLACE_UPLOAD:
      return { ...state, isPlaceUploading: false };
    default:
      return state;
  }
};

export default uiReducer;