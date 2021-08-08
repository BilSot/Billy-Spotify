import './App.css';
import {getAuthURL, SpotifyToken} from "./authorization";
import React, {useEffect} from "react";
import {
    HashParam,
    SpotlifyState,
    TokenAction,
    ErrorResponse,
    UserAction,
    UserDetailsState,
    ErrorAction
} from "./types/models";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {setToken} from "./redux/reducers/tokenReducer/tokenActions";
import Header from "./components/Header";
import MainContent from "./components/MainContent";
import {fetchUserError, fetchUserSuccess} from "./redux/reducers/userDetailsReducer/userDetailsActions";
import axios from "axios";

interface AppProps {
    token: string,
    user: UserDetailsState,
    setToken: (token: string) => TokenAction,
    fetchUserSuccess: (user: UserDetailsState) => UserAction,
    fetchUserError: () => UserAction
}

const App: React.FC<AppProps> = ({token, user, setToken, fetchUserSuccess, fetchUserError}) => {

    const getHashFromURL = (): SpotifyToken => {
        let hashParams = window.location.hash
            .substring(1)
            .split("&")
            .reduce(function (initial: HashParam, item) {
                if (item) {
                    var parts = item.split("=");
                    initial[parts[0]] = decodeURIComponent(parts[1]);
                }
                return initial;
            }, {});

        return {
            access_token: hashParams["access_token"],
            state: hashParams["state"],
            token_type: hashParams["token_type"],
            expires_in: hashParams["expires_in"]
        }
    }

    const fetchUser = (token: string): void => {
        axios.get("https://api.spotify.com/v1/me", {
            headers: {'Authorization': 'Bearer ' + token}
        })
            .then((data) => {
                let user: UserDetailsState = {
                    id: data.data.id,
                    display_name: data.data.display_name,
                    image: data.data.images[0].url,
                    loaded: true
                };
                fetchUserSuccess(user);
            })
            .catch((error) => {
                fetchUserError();
            })
    }

    let hash: SpotifyToken = {
        access_token: '',
        token_type: '',
        expires_in: '',
        state: ''
    };

    useEffect(() => {
        hash = getHashFromURL();
        if (hash.access_token) {
            setToken(hash.access_token);
            fetchUser(hash.access_token);
        } else {
            window.location.href = getAuthURL();
        }
    }, []);

    return (
        <div className="App">
            {!token && (
                <p>Start page</p>
            )}
            {token && (
                <div>
                    <Header loggedInUser={user}/>
                    <MainContent />
                </div>
            )}
        </div>
    )
}

const mapStateToProps = (state: SpotlifyState) => {
    return {
        token: state.tokenState.token,
        user: state.user
    };
};

const mapDispatchToProps = (dispatch: any) => {
    return bindActionCreators(
        {
            setToken,
            fetchUserSuccess,
            fetchUserError
        },
        dispatch
    );
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
