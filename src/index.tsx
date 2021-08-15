import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {createStore, Store} from "redux";
import {Provider} from "react-redux";
import {rootReducer} from "./redux/rootReducer";
import {BillySpotifyStateModel} from "./types/models";
import reportWebVitals from './reportWebVitals';

const BillySpotifyStore: Store<BillySpotifyStateModel> = createStore(rootReducer);

ReactDOM.render(
    <React.StrictMode>
        <Provider store={BillySpotifyStore}>
            <App/>
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
