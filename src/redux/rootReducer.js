import { combineReducers } from "redux";
import {
  INCREMENT,
  DECREMENT,
  CHANGE_THEME,
  START_LOADDING,
  END_LOADDING,
} from "./type";

export function counterReducer(state = 0, action) {
  if (action.type === INCREMENT) {
    return state + 1;
  } else if (action.type === DECREMENT) {
    return state - 1;
  }
  return state;
}

const initialTheme = {
  value: "light",
};
export function themeReducer(state = initialTheme, action) {
  switch (action.type) {
    case CHANGE_THEME:
      return { ...state, value: action.payload };
    default:
      return state;
  }
}

const initialLoadding = {
  value: false,
};
export function loaddingReduce(state = initialLoadding, action) {
  switch (action.type) {
    case START_LOADDING:
      return { ...state, value: action.payload };

    case END_LOADDING:
      return { ...state, value: action.payload };
    default:
      return state;
  }
}

export const rootReducer = combineReducers({
  counter: counterReducer,
  theme: themeReducer,
  loadding: loaddingReduce,
});
