import {TokenAction} from "../../../types/models";

export const SET_TOKEN = "SET_TOKEN";

export function setToken(tokenValue: string): TokenAction{
    return {
        type: SET_TOKEN,
        tokenValue: tokenValue
    }
}
