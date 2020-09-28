import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import logger from "redux-logger";
import { composeWithDevTools } from "redux-devtools-extension";

import "./styles.css";
import { rootReducer, themeReducer } from "./redux/rootReducer";
import {
  asyncIncr,
  changeTheme,
  decrement,
  increment,
  init,
} from "./redux/actions";

const counter = document.getElementById("counter");
const addBtn = document.getElementById("add");
const subBtn = document.getElementById("sub");
const asyncBtn = document.getElementById("async");
const themeBtn = document.getElementById("theme");

/**
 * my own middleware
 * MIDDLEWARE is a function that take an argument (STATE) and return a new function - twice!!!
 * 1 - func take argument NEXT
 * 2 - func take argument ACTION
 */
// function logger(ss) {
//   // state
//   return function (nexTtt) {
//     // next
//     return function (aaa) {
//       // action
//       console.group(`action ${aaa.type}`);
//       console.log("prev state", ss.getState());
//       console.log(`%caction ${aaa.type}`, "color: #0077cc");
//       const newAction = nexTtt(aaa);
//       console.log("next state", ss.getState());
//       console.groupEnd();
//       return newAction;
//     };
//   };
// }

// const store = createStore(
//   rootReducer,
//   // applyMiddleware(thunk, logger) // allow create async action creaters
//   compose(
//     // compose if we want to use "react devtoolse"
//     applyMiddleware(thunk, logger),
//     window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() // "react devtoolse"
//   )
// );

// use redux-devtools-extension - second approch more eysier
const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk, logger))
);

addBtn.addEventListener("click", () => {
  store.dispatch(increment());
});

subBtn.addEventListener("click", () => {
  store.dispatch(decrement());
});

asyncBtn.addEventListener("click", () => {
  store.dispatch(asyncIncr());
});

store.subscribe(() => {
  const state = store.getState();
  counter.textContent = state.counter;

  document.body.className = state.theme.value;

  [addBtn, subBtn, themeBtn, asyncBtn].forEach(
    (btn) => (btn.disabled = state.loadding.value)
  );
});

store.dispatch(init());

themeBtn.addEventListener("click", () => {
  const newTheme = document.body.classList.contains("light") ? "dark" : "light";
  store.dispatch(changeTheme(newTheme));
});
