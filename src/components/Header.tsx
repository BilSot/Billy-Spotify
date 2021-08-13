import React, {useState} from "react";
import Search from "./Search";
import UserDetails from "./UserDetails";
import AddPlaylist from "./AddPlaylist";
import {DraftPlaylist, UserDetailsModel} from "../types/models";
import {Button} from "react-bootstrap";

interface HeaderProps {
    loggedInUser: UserDetailsModel,
    createNewPlaylist: (playlist: DraftPlaylist) => void
}
const Header: React.FC<HeaderProps> = ({loggedInUser, createNewPlaylist}) => {
    /*const [theme, setTheme] = useState(true);
    const color = theme ? props.setTheme("dark") : props.setTheme("light");

    if (theme) {
        document.body.classList.remove("light-mode");
        document.body.classList.add("dark-mode");
    } else {
        document.body.classList.remove("dark-mode");
        document.body.classList.add("light-mode");
    }*/

    return(
        <div>
            {/*<Button onClick={() => setTheme(!theme)} className={`button-${color.theme}`}>Change theme</Button>*/}
            <UserDetails loggedInUser={loggedInUser}/>
            <Search />
            <AddPlaylist createNewPlaylist={createNewPlaylist}/>
        </div>
    )
}

export default Header;
