import {ThemeAction} from "../../../types/models";

export const SET_THEME = "SET_THEME";

export const setTheme = (theme: string): ThemeAction => {
    return {
        type: SET_THEME,
        theme: theme
    }
}
