import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import thunk from 'redux-thunk';
import rootReducers from "./redux/reducers";

import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
const store = createStore(rootReducers, applyMiddleware(thunk))

root.render(
    <Provider store={store}>
        <App />
    </Provider>
);
