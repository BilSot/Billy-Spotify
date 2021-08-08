export type HashParam = {[key: string]: string};

export interface SpotlifyState {
    tokenState: TokenState;
    errorState: ErrorState;
    user: UserDetailsState;
}

export interface TokenState {
    token: string;
}

export interface ErrorState {
    errorResponse: ErrorResponse;
}

export type ErrorResponse = {
    message: string;
    status: string;
}

export interface UserDetailsState {
    display_name: string;
    id: string;
    image: string;
    loaded: boolean;
}

export type TokenAction = {type: string; tokenValue: string};
export type ErrorAction = {type: string; error: ErrorResponse};
export type UserAction = {type: string; user: UserDetailsState};
