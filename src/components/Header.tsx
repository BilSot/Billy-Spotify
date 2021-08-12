import React from "react";
import Search from "./Search";
import UserDetails from "./UserDetails";
import AddPlaylist from "./AddPlaylist";
import {DraftPlaylist, UserDetailsModel} from "../types/models";

interface HeaderProps {
    loggedInUser: UserDetailsModel,
    createNewPlaylist: (playlist: DraftPlaylist) => void
}
const Header: React.FC<HeaderProps> = ({loggedInUser, createNewPlaylist}) => {

    return(
        <div>
            <UserDetails loggedInUser={loggedInUser}/>
            <Search />
            <AddPlaylist createNewPlaylist={createNewPlaylist}/>
        </div>
    )
}

export default Header;
