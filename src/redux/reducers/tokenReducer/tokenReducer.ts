import {TokenAction, TokenState} from "../../../types/models";
import {SET_TOKEN} from "./tokenActions";
import {Reducer} from "redux";

const initialState: TokenState = {
    token: ""
};
export const tokenReducer: Reducer<TokenState, TokenAction> = function (state: TokenState = initialState, action: TokenAction): TokenState{
    switch(action.type) {
        case SET_TOKEN:
        {
            return {
                ...state,
                token: action.tokenValue
            }
        }
    }
    return state;
};
