import React from "react";
import Search from "./Search";
import UserDetails from "./UserDetails";
import AddPlaylist from "./AddPlaylist";
import {UserDetailsState} from "../types/models";

interface HeaderProps {
    loggedInUser: UserDetailsState
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
