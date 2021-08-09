import React from "react";
import Search from "./Search";
import UserDetails from "./UserDetails";
import AddPlaylist from "./AddPlaylist";
import {BillySpotifyStateModel, UserDetailsModel} from "../types/models";
import {fetchUserError, fetchUserSuccess} from "../redux/reducers/userDetailsReducer/userDetailsActions";

interface HeaderProps {
    loggedInUser: UserDetailsModel
}
const Header: React.FC<HeaderProps> = ({loggedInUser}) => {

    return(
        <div>
            <UserDetails loggedInUser={loggedInUser}/>
            <Search />
            <AddPlaylist />
        </div>
    )
}

export default Header;
