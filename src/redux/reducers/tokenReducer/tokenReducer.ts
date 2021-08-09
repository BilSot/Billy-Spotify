import {TokenAction, TokenModel} from "../../../types/models";
import {SET_TOKEN} from "./tokenActions";
import {Reducer} from "redux";

const initialState: TokenModel = {
    token: ""
};
export const tokenReducer: Reducer<TokenModel, TokenAction> = function (state: TokenModel = initialState, action: TokenAction): TokenModel{
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
