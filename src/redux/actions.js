import {
  INCREMENT,
  DECREMENT,
  INIT_APPLICATION,
  CHANGE_THEME,
  START_LOADDING,
  END_LOADDING,
} from "./type";

export function increment() {
  return {
    type: INCREMENT,
  };
}

export function decrement() {
  return {
    type: DECREMENT,
  };
}
export function init() {
  return {
    type: INIT_APPLICATION,
  };
}

export function asyncIncr() {
  return function (d) {
    // d - dispach from midleware thunck
    d(startLoadding());
    setTimeout(() => {
      d(increment());
      d(endLoadding());
    }, 2000);
  };
}

export function changeTheme(newTheme) {
  return {
    type: CHANGE_THEME,
    payload: newTheme,
  };
}

export function startLoadding() {
  return {
    type: START_LOADDING,
    payload: true,
  };
}

export function endLoadding() {
  return {
    type: END_LOADDING,
    payload: false,
  };
}
