import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {createStore, Store} from "redux";
import {Provider} from "react-redux";
import {rootReducer} from "./redux/rootReducer";
import {BillySpotifyStateModel} from "./types/models";

const spotiflyStore: Store<BillySpotifyStateModel> = createStore(rootReducer);

ReactDOM.render(
    <React.StrictMode>
        <Provider store={spotiflyStore}>
            <App/>
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
