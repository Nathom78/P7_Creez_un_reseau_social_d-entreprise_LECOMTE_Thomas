import React from "react";
import ReactDOM from "react-dom/client";
import "./scss/main.scss";
import App from "./App";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducer/index.reducer";

// dev tools
import { composeWithDevTools } from "redux-devtools-extension";
import { getUsers } from "./actions/users.action";


const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

store.dispatch(getUsers());

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
