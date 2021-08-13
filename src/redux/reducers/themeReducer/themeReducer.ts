import {Reducer} from "redux";
import {ThemeAction, ThemeModel} from "../../../types/models";
import {SET_THEME} from "./themeActions";

const initialState: ThemeModel = {
    theme: "dark"
};
export const themeReducer: Reducer<ThemeModel, ThemeAction> = function(state: ThemeModel = initialState, action: ThemeAction): ThemeModel {
    switch (action.type) {
        case SET_THEME: {
            return {
                ...state,
                theme: action.theme
            }
        }
    }
    return state;
}
