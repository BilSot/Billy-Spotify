import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {applyMiddleware, createStore, Store} from "redux";
import createSagaMiddleware from "redux-saga";
import {Provider} from "react-redux";
import {rootReducer} from "./redux/rootReducer";
import {rootSaga} from "./sagas/rootSaga";
import { composeWithDevTools } from 'redux-devtools-extension';
import {BillySpotifyStateModel} from "./types/models";
import reportWebVitals from './reportWebVitals';

const sagaMiddleWare = createSagaMiddleware();

const BillySpotifyStore: Store<BillySpotifyStateModel> = createStore(rootReducer,  composeWithDevTools(applyMiddleware(sagaMiddleWare)));
sagaMiddleWare.run(rootSaga);

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
