import React from "react";
import {UserDetailsModel} from "../types/models";

interface UserDetailsProps {
    loggedInUser: UserDetailsModel
}

const UserDetails: React.FC<UserDetailsProps> = ({loggedInUser}) => {
    return (
        <div>
            {loggedInUser.loaded && (
                <div>
                    <img src={loggedInUser.image} alt="spotify-user-photo"/>
                    <p>{loggedInUser.display_name}</p>
                </div>
            )}
            {!loggedInUser.loaded && (
                <div></div>
            )}
        </div>
    )
}

export default UserDetails;
