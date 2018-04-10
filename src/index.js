import React from "react";
import ReactDOM from "react-dom";
import "./styles/App.min.css";
import "./styles/icomoon/style.css";
import "./styles/animation.min.css";
import App from "./js/App";

import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import reduxThunk from "redux-thunk";
import { AUTH_USER } from "./js/actions/actionTypes";
import registerServiceWorker from "./registerServiceWorker";
import reducers from "./js/reducers";
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
