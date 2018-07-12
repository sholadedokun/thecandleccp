import React from "react";
import ReactDOM from "react-dom";
import "./App.css";
import "./assets/icomoon/style.css";
import "./assets/animation.css";
import App from "./App";

import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import reduxThunk from "redux-thunk";
import { AUTH_USER } from "./actions/actionTypes";
import registerServiceWorker from "./registerServiceWorker";
import reducers from "./reducers";
import logger from "redux-logger";

//applying reduxThunk as middleware enabled us to use dispatch from actions
const createStoreWithMiddleware = applyMiddleware(reduxThunk, logger)(createStore);
const store = createStoreWithMiddleware(reducers);

const token = localStorage.getItem("TheCandleToken");
// If we have a token, consider the user to be signed in
if (token) {
	// we need to update application state
	store.dispatch({ type: AUTH_USER });
}
ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById("root")
);
registerServiceWorker();
